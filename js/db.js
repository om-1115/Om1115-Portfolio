// Supabase credentials — replace these after creating your project at supabase.com
const SUPABASE_URL      = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const _db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadPortfolioData(keys) {
  const targets = keys || ['projects', 'experience', 'testimonials'];

  const results = await Promise.all(targets.map(key =>
    _db.from(key === 'testimonials' ? 'testimonials' : key)
      .select('*')
      .order('sort_order')
  ));

  targets.forEach((key, i) => {
    const { data, error } = results[i];
    if (error) { console.error('[db] failed to load ' + key + ':', error); return; }
    if (key === 'projects')     portfolio.projects   = (data || []).map(_toProject);
    if (key === 'experience')   portfolio.experience = (data || []).map(_toExperience);
    if (key === 'testimonials') portfolio.shoutouts  = data || [];
  });
}

function _toProject({ icon_gradient, accent_color, sort_order, ...r }) {
  return { ...r, iconGradient: icon_gradient, accentColor: accent_color };
}

function _toExperience({ logo_gradient, logo_id, logo_url, sort_order, ...r }) {
  return { ...r, logoGradient: logo_gradient, logoId: logo_id, logoUrl: logo_url };
}
