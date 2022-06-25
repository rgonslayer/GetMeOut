import { supabase } from '../../utils/supabaseClient'

export default function handler(req, res) {
    if (req.method === "POST") {
        supabase.auth.api.setAuthCookie(req, res);
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({
            message: `Method ${req.method} not allowed`,
        });
    }
}