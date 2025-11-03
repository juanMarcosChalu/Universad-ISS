import React from 'react';

export default function AttendanceRow({alumno, value='A', onChange}) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:8,borderBottom:'1px solid #eee'}}>
      <div style={{width:40}}>{alumno.ID}</div>
      <div style={{flex:1}}>
        <div>{alumno.Nombre} {alumno.Apellido}</div>
        <div style={{fontSize:12,color:'#666'}}>{alumno.DNI}</div>
      </div>
      <div>
        <label><input type="radio" name={'s_'+alumno.ID} checked={value==='P'} onChange={()=>onChange(alumno.ID,'P')} /> P</label>
        <label style={{marginLeft:8}}><input type="radio" name={'s_'+alumno.ID} checked={value==='A'} onChange={()=>onChange(alumno.ID,'A')} /> A</label>
        <label style={{marginLeft:8}}><input type="radio" name={'s_'+alumno.ID} checked={value==='J'} onChange={()=>onChange(alumno.ID,'J')} /> J</label>
      </div>
    </div>
  );
}
