const grid=document.querySelector(".work-grid");
if(grid){
 const url="https://klrewmngsybfaicobdng.supabase.co";
 const key="sb_publishable_uyuNlo84yWaMQALVjySERg_O6vViYqR";
 const client=window.supabase.createClient(url,key);
 const bucket="portfolio-designs";
 const {data,error}=await client.from("portfolio_projects").select("id,title,description,category,image_path").eq("is_published",true).order("created_at",{ascending:false});
 if(!error&&data&&data.length){
  grid.innerHTML="";
  for(const p of data){
   const image=client.storage.from(bucket).getPublicUrl(p.image_path).data.publicUrl;
   const card=document.createElement("article");card.className="work-card";
   const visual=document.createElement("div");visual.className="work-visual";visual.style.background="#e7ebf2";
   const img=document.createElement("img");img.src=image;img.alt=p.title;img.loading="lazy";img.style.cssText="width:100%;height:100%;object-fit:cover";
   visual.append(img);
   const info=document.createElement("div");info.className="work-info";
   const textWrap=document.createElement("div");const title=document.createElement("h3");title.textContent=p.title;const desc=document.createElement("p");desc.textContent=p.category+(p.description?" · "+p.description:"");textWrap.append(title,desc);
   const number=document.createElement("span");number.textContent=String(data.indexOf(p)+1).padStart(2,"0");info.append(textWrap,number);card.append(visual,info);grid.append(card);
  }
  const note=document.querySelector(".work-note");if(note)note.textContent="Selected projects from the Bello Graphics and Prints portfolio.";
 }
}