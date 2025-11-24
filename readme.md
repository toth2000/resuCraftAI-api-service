## Deployment CMD
 - Deploy functions using `npx supabase functions deploy <function_name>`

## Development CMD
 - Start colima supabase using `colima start supabase`
 - If not present use `colima start --profile=supabase --vm-type=qemu --mount-type=9p` to create
 - Update docker context using `docker context use colima-supabase`
 - If docker context switch not working then run `unset DOCKER_HOST`
 - Restart terminal using `source ~/.zshrc`
 - Run `npx supabase start`
 - For local mark [analytics] enabled = false in `supabse/config.toml`
 - Check status `npx supabase status`
 - To run functions locally `npx supabase functions serve --all`
 - To stop supabase use `npx supabase stop`
 - Check qemu status using `ps aux | grep qemu` -> copy the output text and paste in editor and check if any qemu process are running, like qemu-system-aarch64 
<!-- unix:///Users/toth2000/.colima/default/docker.sock -->
# Supabase Studio for local
 - `http://localhost:54323/`

# Supabase Email for local
 - To view local email sent by supabase during local testing visit mailpit at `http://127.0.0.1:54324`

# Deployment CMD:
 - Deploy Function using
    `supabase functions deploy [FUNCTION_NAME]`
- Logs
    `supabase functions logs [FUNCTION_NAME]`
## DB Migration:
    - Create migration file using `npx supabase migration new <migration_name>`
    - Run local migration using `npx supabase migration up`
    - Run cloud migration using `npx supabase db push`

## Function
    - Delete function using `supabase functions delete <function_name>`
    - Create function using `supabase functions delete <function_name>`