import {NextResponse} from 'next/server';
import supabase from '../../../../supabase';
import { redirect } from 'next/navigation'

export async function GET(request){
    let data = new URL(request.url);
    let postId = data.pathname.slice(data.pathname.lastIndexOf('/')+1);
    return redirect(`${data.origin}/${postId}`);
}

export async function POST(request){
    try{    

        let body = await request.json();

        let postId = request.nextUrl.pathname.slice(request.nextUrl.pathname.lastIndexOf('/')+1);
        let content = JSON.stringify(body);

        // insert it to supabase.

        if(body){

            let payload = {
                "postid":postId,
                "content":content,
            };

            let response = await supabase.from('posts').insert(payload);
    
            if(response.status == 201){
                return NextResponse.json({
                    succes:true,
                    message:"well received"
                })
            }else{
                return NextResponse.json({
                    succes:false,
                    message:"an error occurred saving the record",
                    error:response.statusText
                })
            }
        }else{
            return NextResponse.json({
                succes:false,
                message:"Message field is required"
            })
        }
    }catch(error){
        return NextResponse.json({
            success:false,
            message:"An error occurred receiving callback",
            error
        })
    }
    
}