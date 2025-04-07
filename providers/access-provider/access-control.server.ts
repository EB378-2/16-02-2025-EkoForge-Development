// lib/access-control.server.ts
import { newEnforcer } from 'casbin';
import { model, adapter } from './permissions';

interface PermissionCheckParams {
  role: string;
  resource: string;
  action: string;
  id?: string;
}

export async function checkPermission({
  role,
  resource,
  action,
  id
}: PermissionCheckParams): Promise<{ can: boolean }> {
  const enforcer = await newEnforcer(model, adapter);
  
  try {
    // 1. First check general resource permission
    const generalPermission = await enforcer.enforce(role, resource, action);
    
    // 2. For specific resource actions (edit/show/delete)
    if (id && (action === 'delete' || action === 'edit' || action === 'show')) {
      // Check both general permission and specific resource permission
      const specificPermission = await enforcer.enforce(
        role, 
        `${resource}/${id}`, 
        action
      );
      
      return { can: generalPermission && specificPermission };
    }
    
    // 3. For list/create actions
    return { can: generalPermission };
    
  } catch (error) {
    console.error('Permission check error:', error);
    return { can: false };
  }
}