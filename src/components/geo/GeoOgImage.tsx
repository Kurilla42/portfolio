import { ImageResponse } from 'next/og';
export function geoOgImage(agency = false) {
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#111210',color:'#e0ded8',padding:'60px 70px',fontFamily:'sans-serif'}}>
    <div style={{display:'flex',fontSize:24,color:'#c7b684',letterSpacing:3}}>GEO-АУДИТ / {agency ? 'ДЛЯ АГЕНТСТВ' : 'ДЛЯ БИЗНЕСА'}</div>
    <div style={{display:'flex',fontSize:68,fontWeight:700,lineHeight:1.12,maxWidth:1040}}>{agency ? 'GEO-аудит для клиента вашего агентства' : 'Что нейросети отвечают о вашей компании'}</div>
    <div style={{display:'flex',fontSize:28}}>8 каналов · Исходные ответы · Проверка сайта · План работ</div>
    <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #c7b684',paddingTop:24,fontSize:30}}><span>{agency ? '20 000' : '25 000'} руб. · 3 рабочих дня</span><span style={{color:'#c7b684'}}>Антон Колесников</span></div>
  </div>,{width:1200,height:630});
}
