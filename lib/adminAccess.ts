export function isAdminEnabled(): boolean {
  if (process.env.ENABLE_ADMIN_PANEL === 'true') {
    return true;
  }

  if (process.env.ENABLE_ADMIN_PANEL === 'false') {
    return false;
  }

  return process.env.NODE_ENV !== 'production';
}
