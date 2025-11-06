## Deployment CMD
 - Deploy functions using `npx supabase functions deploy <function_name>`

## Development CMD
 - Run `export DOCKER_HOST="unix:///Users/$USER/.colima/default/docker.sock"` once after every time system is booted
 - Run `npx supabase start`
 - Check status `npx supabase status`
 - To run functions locally `npx supabase functions serve --all`
 - To stop supabase use `npx supabase stop`

# Supabase Studio for local
 - http://localhost:54323/

# Deployment CMD:
 - Deploy Function using

## DB Migration:
    - Create migration file using `npx supabase migration new <migration_name>`
    - Run local migration using `npx supabase migration up`
    - Run cloud migration using `npx supabase db push`

## Function
    - Delete function using `supabase functions delete <function_name>`
    - Create function using `supabase functions delete <function_name>`