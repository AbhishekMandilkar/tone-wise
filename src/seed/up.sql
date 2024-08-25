-- Create the subscriptions table
CREATE TABLE public.subscriptions (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    code VARCHAR(255) NOT NULL,
    CONSTRAINT subscriptions_pkey PRIMARY KEY (id)
);

-- Create the users table
CREATE TABLE public.users (
    user_id VARCHAR(255) NOT NULL,
    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    tone_count INTEGER DEFAULT 0,
    is_subscribed BOOLEAN DEFAULT FALSE,
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    subscription_id UUID,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT fk_subscription FOREIGN KEY (subscription_id) REFERENCES public.subscriptions (id)
);

-- Create the tones table
CREATE TABLE public.tones (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id VARCHAR(255),
    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    input_text TEXT NOT NULL,
    tone VARCHAR(50) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    CONSTRAINT tones_pkey PRIMARY KEY (id),
    CONSTRAINT tones_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (user_id)
);