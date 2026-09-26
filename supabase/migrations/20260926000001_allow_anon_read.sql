-- ==============================================================================
-- Allow anon (unauthenticated / public) read access to catalog & campaigns
-- This enables viewing seeded campaigns and inputs before authentication is built.
-- ==============================================================================

DROP POLICY IF EXISTS "Products viewable by authenticated users" ON public.products;
CREATE POLICY "Products viewable by everyone" ON public.products FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Campaigns viewable by authenticated users" ON public.campaigns;
CREATE POLICY "Campaigns viewable by everyone" ON public.campaigns FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Promotional inputs viewable by authenticated users" ON public.promotional_inputs;
CREATE POLICY "Promotional inputs viewable by everyone" ON public.promotional_inputs FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Pitches viewable by authenticated users" ON public.pitches;
CREATE POLICY "Pitches viewable by everyone" ON public.pitches FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Rubrics viewable by authenticated users" ON public.assessment_rubrics;
CREATE POLICY "Rubrics viewable by everyone" ON public.assessment_rubrics FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Coaching actions viewable by authenticated users" ON public.coaching_actions;
CREATE POLICY "Coaching actions viewable by everyone" ON public.coaching_actions FOR SELECT TO anon, authenticated USING (true);
