import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
    try {
        const { userId } = await request.json()

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 })
        }

        const { data: deletedMedia, error: mediaError } = await admin
            .from('media')
            .delete()
            .eq('user_id', userId)
            .select()

        if (mediaError) {
            return NextResponse.json({ error: mediaError.message }, { status: 500 })
        }

        const { error: userError } = await admin.auth.admin.deleteUser(userId)

        if (userError) {
            return NextResponse.json({ error: userError.message }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            deletedMediaCount: deletedMedia?.length || 0,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}