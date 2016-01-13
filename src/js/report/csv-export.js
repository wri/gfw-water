import saveAs from 'FileSaver';

const canopyDensity = (field, canopy) => {
  return field.replace('##', canopy);
}

export default (watershed) => {
  let {attributes} = watershed;
  let canopy = attributes._canopy;
  // maj_name gets double-quotes because it's the only string and only 
  // attribute likely to have a comma in it.
  //
  // Could probably used a tagged template instead of canopyDensity to 
  // build attribute field names on the fly.
  let watershedInfo = `watershed name,"${attributes.maj_name}"
watershed area (Ha),${attributes.ws_ha}
tree cover (Ha),${attributes[canopyDensity('tc_g##_ha', `${canopy}`)]}
wetland (Ha),${attributes.wet_ha}
major dams,${attributes.dams_c}
water intake locations ,${attributes.wd_c}
recent tree cover loss risk score,${attributes.rs_tl_c}
historical tree cover loss risk score,${attributes.rs_pf_c}
erosion risk score,${attributes.rs_sed_c}
fire risk score,${attributes.rs_fire_c}
total tree cover loss area (ha) 2001-2014,${attributes[canopyDensity('tl_g##_all_ha', `${canopy}`)]}
2001 tree cover loss (ha),${attributes[canopyDensity('tl_g##_01_ha', `${canopy}`)]}
2002 tree cover loss (ha),${attributes[canopyDensity('tl_g##_02_ha', `${canopy}`)]}
2003 tree cover loss (ha),${attributes[canopyDensity('tl_g##_03_ha', `${canopy}`)]}
2004 tree cover loss (ha),${attributes[canopyDensity('tl_g##_04_ha', `${canopy}`)]}
2005 tree cover loss (ha),${attributes[canopyDensity('tl_g##_05_ha', `${canopy}`)]}
2006 tree cover loss (ha),${attributes[canopyDensity('tl_g##_06_ha', `${canopy}`)]}
2007 tree cover loss (ha),${attributes[canopyDensity('tl_g##_07_ha', `${canopy}`)]}
2008 tree cover loss (ha),${attributes[canopyDensity('tl_g##_08_ha', `${canopy}`)]}
2009 tree cover loss (ha),${attributes[canopyDensity('tl_g##_09_ha', `${canopy}`)]}
2010 tree cover loss (ha),${attributes[canopyDensity('tl_g##_10_ha', `${canopy}`)]}
2011 tree cover loss (ha),${attributes[canopyDensity('tl_g##_11_ha', `${canopy}`)]}
2012 tree cover loss (ha),${attributes[canopyDensity('tl_g##_12_ha', `${canopy}`)]}
2013 tree cover loss (ha),${attributes[canopyDensity('tl_g##_13_ha', `${canopy}`)]}
2014 tree cover loss (ha),${attributes[canopyDensity('tl_g##_14_ha', `${canopy}`)]}
tree cover loss trend,${attributes[canopyDensity('tlt_g##_ha', `${canopy}`)]}
potential tree cover (Ha),${attributes.ptc_ha}
remaining forest cover as percent of potential tree cover,${(attributes[canopyDensity('tl_g##_all_ha', `${canopy}`)] / attributes.ptc_ha * 100).toFixed(2)}
active fires (past 24 hours),${attributes._fireCount}
average annual fire count 2012-2015,${attributes.fire_c}`;
  
  let blob = new Blob([ watershedInfo ], { type: "text/plain;charset=utf-8" });
  saveAs(blob, `${attributes.maj_name}-canopy-density-${canopy}.csv`);
}