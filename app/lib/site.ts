/** Fork identity. Configure the public deployment URL in Cloudflare before building. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://editorapdf.171818.xyz').replace(/\/+$/, '');
export const maintainer = 'giao4giao';
export const profileUrl = 'https://github.com/giao4giao';
export const repositoryUrl = 'https://github.com/giao4giao/editorapdf';
export const issuesUrl = `${repositoryUrl}/issues`;
export const upstreamUrl = 'https://github.com/affsquadDevs/editorapdf';
