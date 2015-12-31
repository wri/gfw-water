import dom from 'dojo/dom';
import domQuery from 'dojo/query';
import domClass from 'dojo/dom-class';
import manipulate from 'dojo/NodeList-manipulate';
import number from 'dojo/number';
import reportCharts from './report-charts'

const noDecimal = { places: 0 };
const oneDecimal = { places: 1 };
const twoDecimals = { places: 2 };
const percent = { type: 'percent' };
const percentTwoDecimals = { type: 'percent', places: 2 };

const riskCategory = (risk) => {
  let description = 'low';
  if (risk == 2) {
    description = 'low to medium';
  }
  if (risk == 3) {
    description = 'medium';
  }
  if (risk == 4) {
    description = 'medium to high';
  }
  if (risk == 5) {
    description = 'high';
  }
  return description;
}

export default {
  use: (options) => {
    const {config, watershed} = options;

    // TODO: put attribute field names in config file
    const {attributes} = watershed;
    const canopy = attributes._canopy;
    
    const wsArea = attributes.ws_ha / 1000000;
    const wetArea = attributes.wet_ha / 1000000;
    const wetPercent = wetArea / wsArea;

    const treeCover = attributes['tc_g' + canopy + '_ha'] / 1000000;
    const treePercent = treeCover / wsArea;
    const dams = attributes.dams_c;

    const potentialCover = attributes.ptc_ha / 1000000;
    const waterWithdrawl = attributes.wd_c;

    const treeLossRisk = attributes.rs_tl_c;
    const treeLossAmount = attributes['tl_g' + canopy + '_all_ha'] / 1000000;
    const treeLossPercent = attributes['tl_g' + canopy + '_all_ha'] / attributes['tc_g' + canopy + '_ha'];
    const treeLossRate = attributes['tlt_g' + canopy + '_ha'];
    const treeLossTrend = (treeLossRate > -1) ? 'positive' : 'negative';

    const potentialLossRisk = attributes.rs_pf_c;
    const potentialLossAmount = attributes.ptc_ha / 1000000;
    const potentialLossPercent = potentialLossAmount / wsArea;
    const potentialLossRate = attributes['tl_g' + canopy + '_all_ha'] / attributes.ptc_ha;

    const erosionRisk = attributes.rs_sed_c;
    const erosionRiskDescription = riskCategory(erosionRisk);

    const fireRisk = attributes.rs_fire_c;
    const fireCount = attributes._fireCount;

    dom.byId('watershed-area').innerHTML = number.format(wsArea, oneDecimal);
    dom.byId('wetland-area').innerHTML = number.format(wetArea, oneDecimal);
    dom.byId('wetland-percent').innerHTML = number.format(wetPercent, percentTwoDecimals);

    dom.byId('tree-cover').innerHTML = number.format(treeCover, oneDecimal);
    dom.byId('tree-cover-percent').innerHTML = number.format(treePercent, percentTwoDecimals);
    dom.byId('dam-count').innerHTML = dams;

    dom.byId('potential-cover').innerHTML = number.format(potentialCover, oneDecimal);
    dom.byId('water-withdrawl').innerHTML = waterWithdrawl;

    dom.byId('risk-tree-loss').innerHTML = treeLossRisk;
    dom.byId('tree-loss-amount').innerHTML = number.format(treeLossAmount, oneDecimal);
    dom.byId('tree-loss-percent').innerHTML = number.format(treeLossPercent, percentTwoDecimals);
    dom.byId('tree-loss-rate').innerHTML = treeLossRate;
    dom.byId('tree-loss-trend').innerHTML = treeLossTrend;

    dom.byId('risk-potential-loss').innerHTML = potentialLossRisk;
    dom.byId('potential-loss-amount').innerHTML = number.format(potentialLossAmount, oneDecimal);
    dom.byId('potential-loss-percent').innerHTML = number.format(potentialLossPercent, percent);
    dom.byId('potential-loss-rate').innerHTML = number.format(potentialLossRate, percent);

    dom.byId('risk-erosion').innerHTML = erosionRisk;
    dom.byId('risk-erosion-description').innerHTML = erosionRiskDescription;

    dom.byId('risk-fire').innerHTML = fireRisk;
    dom.byId('recent-fire-count').innerHTML = fireCount;

    // .innerHTML available on node lists via NodeList-manipulate module.
    domQuery('span.canopy-density').innerHTML(attributes._canopy);

    // Use watershed name as report title.
    const watershedName = watershed.attributes[config.watershedName] + ' Watershed';
    domQuery('section.map.overview h1')[0].innerHTML = watershedName; 

    // Figure out which risk rows to show in Plan for Action section.
    const visibleClassName = 'applicable';
    const noRisk = domQuery('tr.no-risk')[0];
    if (treeLossRisk > 3) {
      console.log('treeLossRisk over 3');
      domClass.add(domQuery('tr.tree-loss-risk')[0], visibleClassName);
    }
    if (potentialLossRisk > 3) {
      console.log('potentialLossRisk over 3');
      domClass.add(domQuery('tr.potential-loss-risk')[0], visibleClassName);
    }
    if (erosionRisk > 3) {
      console.log('erosionRisk over 3');
      domClass.add(domQuery('tr.erosion-risk')[0], visibleClassName);
    }
    if (fireRisk > 3) {
      console.log('fireRisk over 3');
      domClass.add(domQuery('tr.fire-risk')[0], visibleClassName);
    }
    if (treeLossRisk > 3 || potentialLossRisk > 3 || erosionRisk > 3 || fireRisk > 3) {
      domClass.add(noRisk, 'risk-info');
    }
  }
}