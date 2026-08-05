import { getEnv } from "@/lib/cloudflare";

export type ProjectImage={id:number;object_key:string;public_url:string;alt_text:string;sort_order:number};
export type Project={id:number;slug:string;title:string;service:string;location:string;description:string;year:number|null;featured:number;published:number;sort_order:number;updated_at:string;images:ProjectImage[]};

export async function listProjects(includeDrafts=false):Promise<Project[]>{
 const {DB}=getEnv();const where=includeDrafts?"":"WHERE p.published = 1";
 const {results}=await DB.prepare(`SELECT p.*,i.id image_id,i.object_key,i.public_url,i.alt_text,i.sort_order image_sort FROM projects p LEFT JOIN project_images i ON i.project_id=p.id ${where} ORDER BY p.sort_order,p.id DESC,i.sort_order,i.id`).all();
 const map=new Map<number,Project>();
 for(const row of results as Record<string,any>[]){if(!map.has(row.id))map.set(row.id,{id:Number(row.id),slug:String(row.slug),title:String(row.title),service:String(row.service),location:String(row.location),description:String(row.description),year:row.year==null?null:Number(row.year),featured:Number(row.featured),published:Number(row.published),sort_order:Number(row.sort_order),updated_at:String(row.updated_at),images:[]});if(row.image_id)map.get(row.id)!.images.push({id:row.image_id,object_key:row.object_key,public_url:row.public_url,alt_text:row.alt_text,sort_order:row.image_sort});}
 return [...map.values()];
}
export async function getProject(slug:string,includeDrafts=false){return (await listProjects(includeDrafts)).find(project=>project.slug===slug)??null;}
