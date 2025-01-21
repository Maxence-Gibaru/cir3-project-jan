import { NextRequest,NextResponse } from "next/server";

//POST pour valider le qr code
export async function post(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  if(body.résultat=="1234"){
    return NextResponse.json("oui");
  }
  else{
    return NextResponse.json("non");
  }
}