// lib/access-control.server.ts
import { newEnforcer } from 'casbin';
import { model, adapter } from './permissions';

export async function checkPermission(role: string, resource: string, action: string) {
  const enforcer = await newEnforcer(model, adapter);
  return enforcer.enforce(role, resource, action);
}