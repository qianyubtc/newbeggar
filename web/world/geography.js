export const PLAZA = { x:-48, z:8 };
export const DESTINATIONS = {
  plaza: { x:-48, z:8, name:'中央广场' },
  street: { x:-16, z:0, name:'要饭大街' },
  bridge: { x:-48, z:-24, name:'天桥夜巡' },
};
export const RAID_ROOMS = ['桥洞','破庙','天桥底','公园长椅','地铁通道','烂尾楼'];
export const roomPosition = room => ({ x:room%2===0?-69:-27, z:-32-Math.floor(room/2)*18 });
export function inPlaza(x,z) { return x>=-70&&x<=-26&&z>=-18&&z<=20; }
export function inBridge(x,z) { return x>=-82&&x<=-14&&z>=-84&&z<=-22; }
export function reserved(x,z) { return inPlaza(x,z)||inBridge(x,z)||(x>=-54&&x<=-42&&z>=-24&&z<=-18); }
export function landmarkWalkable(x,z) {
  if(!reserved(x,z))return null;
  if(inPlaza(x,z))return Math.hypot(x+48,z)>=3.1;
  if(z>-75&&z<-25&&((x>-53&&x<-51.8)||(x>-44.2&&x<-43)))return false;
  return true;
}
export function groundHeight(x,z) {
  if(x<-51.8||x>-44.2||z<-75||z>-25)return 0;
  if(z>=-35)return(-25-z)*.4;
  if(z<=-65)return(z+75)*.4;
  return 4;
}
export function zoneName(x,z) { return inPlaza(x,z)?'中央广场 · 复活点':inBridge(x,z)?'天桥夜巡':''; }
