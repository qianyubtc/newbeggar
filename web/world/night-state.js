import { RAID_ROOMS } from './geography.js';

export function nightClock(round,serverNow) {
  if(!round)return {seconds:null,text:'--:--',remaining:0};
  const seconds=Math.max(0,Math.ceil((round.locks_at-serverNow)/1000));
  return {seconds,text:`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`,remaining:Math.max(0,Math.min(1,(round.locks_at-serverNow)/Math.max(1,round.locks_at-round.opens_at)))};
}
export function nightPhase(data,serverNow,fresh) {
  if(!data?.round)return fresh?'loading':'offline';
  if(!fresh)return 'offline';
  if(data.round.status!=='open'||nightClock(data.round,serverNow).seconds===0)return 'locked';
  return data.me?.amt>0?'hidden':'choosing';
}
export function nightSelection(previous,next,selected) {
  if(!previous)return selected>=0?selected:next.me?.amt>0?next.me.room:-1;
  if(previous.round?.id!==next.round?.id)return next.me?.amt>0?next.me.room:-1;
  if(selected<0&&next.me?.amt>0)return next.me.room;
  return selected;
}
export function nightCanJoin({phase,selected,me,amount,max,submitting=false,caught=false}) {
  return ['choosing','hidden'].includes(phase)&&!!me&&!caught&&!submitting&&Number.isInteger(selected)&&selected>=0&&selected<6&&Number.isInteger(amount)&&amount>=1&&amount<=max&&amount<=me.coins+(me.amt||0);
}
export function nightResult(round,siteID) {
  if(!round)return null;
  const player=round.players?.find(p=>p.id===siteID),room=RAID_ROOMS[round.killed];
  if(round.status==='void')return {title:`第 ${round.id} 局 · 流局退回`,text:player?`不足两个藏身点有人，${player.amt} 个钢镚已退回。`:'不足两个藏身点有人，本局钢镚全部退回。'};
  if(!room)return null;
  if(!player)return {title:`第 ${round.id} 局 · 巡查结束`,text:`警车查封「${room}」。你本局没有参加，可选择下一局的藏身点。`};
  if(player.room===round.killed)return {title:`第 ${round.id} 局 · 被发现了`,text:`「${room}」被查封，失去本局 ${player.amt} 个钢镚。8 秒后回中央广场，下局可以再来。`};
  return {title:`第 ${round.id} 局 · 成功躲过`,text:`你藏在「${RAID_ROOMS[player.room]}」，返还 ${player.amt} 个钢镚，获得 ${Math.max(0,player.payout-player.amt)} 个分成。`};
}
