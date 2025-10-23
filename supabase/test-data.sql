-- Test data for NeoMuse Art Gallery
-- Run this in Supabase SQL Editor after creating the artifacts table

INSERT INTO artifacts (title, artist, year, description, image_url, category, color_theme, display_order) VALUES
('Digital Dreams', 'Alex Chen', '2024', 'A mesmerizing digital artwork exploring the intersection of technology and human emotion through vibrant color gradients and abstract forms.', 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=800', 'digital', '#8b5cf6', 1),

('Urban Symphony', 'Maria Rodriguez', '2023', 'A dynamic composition capturing the rhythm and energy of city life through bold geometric patterns and contrasting colors.', 'https://images.pexels.com/photos/1109542/pexels-photo-1109542.jpeg?auto=compress&cs=tinysrgb&w=800', 'photography', '#ef4444', 2),

('Abstract Harmony', 'David Kim', '2024', 'An exploration of form and color that challenges traditional perspectives while maintaining visual balance and emotional depth.', 'https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=800', 'painting', '#10b981', 3),

('Neon Reflections', 'Sarah Johnson', '2023', 'A futuristic piece that plays with light and reflection, creating an immersive experience that transports viewers to another dimension.', 'https://images.pexels.com/photos/1109544/pexels-photo-1109544.jpeg?auto=compress&cs=tinysrgb&w=800', 'digital', '#f59e0b', 4),

('Minimalist Essence', 'James Wilson', '2024', 'A study in simplicity and elegance, proving that sometimes less is more when it comes to artistic expression.', 'https://images.pexels.com/photos/1109545/pexels-photo-1109545.jpeg?auto=compress&cs=tinysrgb&w=800', 'sculpture', '#6366f1', 5),

('Cosmic Journey', 'Elena Petrov', '2024', 'An interstellar voyage captured through swirling galaxies and cosmic colors that evoke wonder and exploration.', 'https://images.pexels.com/photos/1109546/pexels-photo-1109546.jpeg?auto=compress&cs=tinysrgb&w=800', 'digital', '#ec4899', 6),

('Nature''s Canvas', 'Michael Brown', '2023', 'A celebration of natural beauty through organic shapes and earth tones that connect us to the natural world.', 'https://images.pexels.com/photos/1109547/pexels-photo-1109547.jpeg?auto=compress&cs=tinysrgb&w=800', 'painting', '#059669', 7),

('Metropolitan Pulse', 'Lisa Zhang', '2024', 'The heartbeat of the city captured through dynamic lines and urban energy that reflects modern life.', 'https://images.pexels.com/photos/1109548/pexels-photo-1109548.jpeg?auto=compress&cs=tinysrgb&w=800', 'photography', '#dc2626', 8);
