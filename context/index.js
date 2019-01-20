// @flow
import actions, { registerActions } from './actionRegistry';
import actionTypes, { registerActionTypes } from './actionTypeRegistry';
import services, { registerServices } from './serviceRegistry';

export { actions, services, actionTypes };

export const context = {
  actions,
  actionTypes,
  registerActions,
  registerActionTypes,
  services,
  registerServices,
};
