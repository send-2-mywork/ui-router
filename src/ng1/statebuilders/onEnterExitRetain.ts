/** @module ng1 */ /** */
import {State} from "../../state/stateObject";
import {TransitionStateHookFn, HookResult} from "../../transition/interface";
import {Transition} from "../../transition/transition";
import IInjectorService = angular.auto.IInjectorService;
import {services} from "../../common/coreservices";
import {getLocals} from "../services";
import {ResolveContext} from "../../resolve/resolveContext";

/**
 * This is a [[StateBuilder.builder]] function for angular1 `onEnter`, `onExit`,
 * `onRetain` callback hooks on a [[Ng1StateDeclaration]].
 *
 * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
 * ensures that those hooks are injectable for angular-ui-router (ng1).
 */
export const getStateHookBuilder = (hookName) =>
function stateHookBuilder(state: State, parentFn): TransitionStateHookFn {
  let hook = state[hookName];
  function decoratedNg1Hook(trans: Transition, inj: IInjectorService): HookResult {
    let resolveContext = new ResolveContext(trans.treeChanges().to);
    return services.$injector.invoke(hook, this, getLocals(resolveContext));
  }

  return hook ? decoratedNg1Hook : undefined;
};
