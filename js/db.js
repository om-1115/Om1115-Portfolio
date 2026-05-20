// Supabase credentials — replace these after creating your project at supabase.com
const SUPABASE_URL      = 'https://tspayfdhncxhpqiqbvhu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcGF5ZmRobmN4aHBxaXFidmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjI2ODYsImV4cCI6MjA5NDgzODY4Nn0.C5PkXTjhDLndno7KlhP-TKUsI7pmtZpNmWTvZ_7EeBU';

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
