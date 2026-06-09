const JAPAN_BOUNDS = [[24, 122], [46.8, 146.5]];

const MAJOR_CITIES = [
  { name: '札幌', lat: 43.0642, lon: 141.3469 },
  { name: '青森', lat: 40.8246, lon: 140.7400 },
  { name: '仙台', lat: 38.2682, lon: 140.8694 },
  { name: '新潟', lat: 37.9022, lon: 139.0236 },
  { name: '東京', lat: 35.6762, lon: 139.6503 },
  { name: '横浜', lat: 35.4437, lon: 139.6380 },
  { name: '名古屋', lat: 35.1815, lon: 136.9066 },
  { name: '金沢', lat: 36.5613, lon: 136.6562 },
  { name: '長野', lat: 36.6486, lon: 138.1948 },
  { name: '大阪', lat: 34.6937, lon: 135.5023 },
  { name: '京都', lat: 35.0116, lon: 135.7681 },
  { name: '神戸', lat: 34.6901, lon: 135.1955 },
  { name: '広島', lat: 34.3853, lon: 132.4553 },
  { name: '高知', lat: 33.5597, lon: 133.5311 },
  { name: '福岡', lat: 33.5902, lon: 130.4017 },
  { name: '熊本', lat: 32.8031, lon: 130.7079 },
  { name: '鹿児島', lat: 31.5966, lon: 130.5571 },
  { name: '那覇', lat: 26.2124, lon: 127.6809 }
];

const CITY_LABEL_TRANSFORM = {
  '札幌': 'translate(16px,-16px)',
  '東京': 'translate(28px,-20px)',
  '横浜': 'translate(28px,18px)',
  '名古屋': 'translate(30px,-4px)',
  '京都': 'translate(-26px,-20px)',
  '大阪': 'translate(26px,2px)',
  '神戸': 'translate(-24px,18px)',
  '高知': 'translate(2px,18px)',
  '福岡': 'translate(20px,-16px)',
  '熊本': 'translate(-22px,18px)',
  '鹿児島': 'translate(24px,14px)',
  '那覇': 'translate(18px,0px)'
};

const WMO_ICONS = {
  0:['☀️','快晴'],1:['🌤️','晴れ'],2:['⛅','晴れ時々くもり'],3:['☁️','くもり'],
  45:['🌫️','霧'],48:['🌫️','着氷性の霧'],51:['🌦️','弱い霧雨'],53:['🌦️','霧雨'],
  55:['🌧️','強い霧雨'],56:['🌨️','着氷性の弱い霧雨'],57:['🌨️','着氷性の強い霧雨'],
  61:['🌦️','弱い雨'],63:['🌧️','雨'],65:['🌧️','強い雨'],66:['🌨️','弱い凍雨'],
  67:['🌨️','強い凍雨'],71:['🌨️','弱い雪'],73:['❄️','雪'],75:['❄️','強い雪'],
  77:['🌨️','雪粒'],80:['🌦️','にわか雨'],81:['🌧️','強いにわか雨'],82:['⛈️','激しいにわか雨'],
  85:['🌨️','にわか雪'],86:['❄️','強いにわか雪'],95:['⛈️','雷雨'],96:['⛈️','雷雨とひょう'],
  99:['⛈️','激しい雷雨とひょう']
};

const SCALE_LABEL = { '-1':'不明',10:'1',20:'2',30:'3',40:'4',45:'5弱',50:'5強',55:'6弱',60:'6強',70:'7' };
const SCALE_COLOR = { 10:'#4fc3f7',20:'#29b6f6',30:'#ffee58',40:'#ffca28',45:'#fb8c00',50:'#f4511e',55:'#e53935',60:'#8e24aa',70:'#6a1b9a' };

const LANDSLIDE_COLOR_RULES = [
  { codes:['33','35','36','37','38','50','51'], color:'#000000', label:'災害切迫' },
  { codes:['46','47','41','42'], color:'#6a1b9a', label:'危険' },
  { codes:['03','04','05','06','07','08'], color:'#e53935', label:'警戒' },
  { codes:['10','18','19'], color:'#fdd835', label:'注意' }
];

const TSUNAMI_GRADE = {
  MajorWarning: { label:'大津波警報', color:'#7b1fa2' },
  Warning:      { label:'津波警報',   color:'#d32f2f' },
  Watch:        { label:'津波注意報', color:'#fbc02d' },
  Forecast:     { label:'津波予報',   color:'#1565c0' },
  Unknown:      { label:'津波情報',   color:'#1565c0' }
};

const TSUNAMI_AREA_POINTS = {
  '茨城県':[36.35,140.65],
  '千葉県九十九里・外房':[35.35,140.55],
  '千葉県内房':[35.15,139.95],
  '伊豆諸島':[33.30,139.50],
  '小笠原諸島':[27.10,142.20],
  '相模湾・三浦半島':[35.15,139.55],
  '静岡県':[34.80,138.35],
  '愛知県外海':[34.45,137.10],
  '三重県南部':[34.00,136.20],
  '和歌山県':[33.80,135.20],
  '徳島県':[33.85,134.45],
  '高知県':[33.25,133.45],
  '宮崎県':[31.90,131.50],
  '鹿児島県東部':[31.40,131.00],
  '種子島・屋久島地方':[30.40,130.70],
  '奄美群島・トカラ列島':[28.70,129.60],
  '沖縄本島地方':[26.35,127.80],
  '大東島地方':[25.90,131.30],
  '宮古島・八重山地方':[24.35,124.20]
};

const state = {
  currentSceneIndex: 0,
  forceQuakeUntil: 0,
  municipalityIndex: [],
  municipalitySorted: [],
  geometryCache: new Map(),
  areaJson: null,

  maps: {},
  layers: {
    weather: L.layerGroup(),
    landslide: L.layerGroup(),
    quake: L.layerGroup(),
    precip: L.layerGroup(),
    typhoon: L.layerGroup(),
    tsunami: L.layerGroup(),
    radar: null
  },

  weatherItems: [],
  amedasStations: null,
  precipRanking: [],
  weatherBulletins: ['読込中…'],

  typhoon: { active:false, headline:'', summary:'', track:[] },
  tsunami: { active:false, issueTime:'', areas:[], quake:null },

  lastEEWKey: null,
  lastQuakeId: null,
  eewInitialized: false,
  quakeInitialized: false
};

const $ = (id) => document.getElementById(id);

function norm(s=''){
  return String(s).replace(/[\s　]/g,'').replace(/ヶ/g,'ケ').replace(/之/g,'の').replace(/ヵ/g,'カ');
}
function weatherIcon(code){ return WMO_ICONS[code] || ['❔','不明']; }
function scaleLabel(v){ return SCALE_LABEL[String(v)] || '不明'; }
function depthLabel(v){ return v == null || v < 0 ? '不明' : v === 0 ? 'ごく浅い' : `${v}km`; }
function truncate(s, n=22){ s = String(s || ''); return s.length > n ? `${s.slice(0, n)}…` : s; }
function jstDate(d=new Date()){
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone:'Asia/Tokyo', year:'numeric', month:'numeric', day:'numeric'
  }).format(d);
}
function jstTimeHM(d=new Date()){
  const p = new Intl.DateTimeFormat('ja-JP', {
    timeZone:'Asia/Tokyo', hour:'numeric', minute:'2-digit', hour12:false
  }).formatToParts(d);
  const h = p.find(v=>v.type==='hour')?.value ?? '0';
  const m = p.find(v=>v.type==='minute')?.value ?? '00';
  return `${h}時${m}分`;
}
function parseAnyTime(v){
  if (!v) return null;
  if (v instanceof Date) return v;
  const s = String(v).trim();
  if (/^\d{4}\/\d{2}\/\d{2}/.test(s)) return new Date(s.replace(/\//g,'-').replace(' ','T') + '+09:00');
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return new Date(s);
  return new Date(s);
}
function fmtDateTime(v){
  const d = parseAnyTime(v);
  if (!d || Number.isNaN(+d)) return '-';
  return `${jstDate(d)} ${jstTimeHM(d)}`;
}
function fmtDateTimeFull(v){
  const d = parseAnyTime(v);
  if (!d || Number.isNaN(+d)) return '-';
  const p = new Intl.DateTimeFormat('ja-JP', {
    timeZone:'Asia/Tokyo', year:'numeric', month:'numeric', day:'numeric',
    hour:'numeric', minute:'2-digit', second:'2-digit', hour12:false
  }).formatToParts(d);
  const map = Object.fromEntries(p.filter(x=>x.type !== 'literal').map(x=>[x.type, x.value]));
  return `${map.year}年${map.month}月${map.day}日 ${map.hour}時${map.minute}分${map.second}秒`;
}
function toDecimalDM(arr){
  if (!Array.isArray(arr) || arr.length < 2) return null;
  return Number(arr[0]) + Number(arr[1]) / 60;
}
async function fetchJSON(url, options={}){
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}
function createBaseMap(id, mode='dark'){
  const map = L.map(id, {
    zoomControl:false,
    attributionControl:false,
    minZoom:4,
    maxZoom:10,
    zoomSnap:.25,
    dragging:false,
    scrollWheelZoom:false,
    doubleClickZoom:false,
    boxZoom:false,
    keyboard:false,
    tap:false,
    touchZoom:false
  }).fitBounds(JAPAN_BOUNDS);

  const tiles = mode === 'light'
    ? 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';

  L.tileLayer(tiles, { subdomains:'abcd', maxZoom:10 }).addTo(map);
  return map;
}
function initMaps(){
  state.maps.forecast  = createBaseMap('forecastMap', 'dark');
  state.maps.landslide = createBaseMap('landslideMap', 'dark');
  state.maps.radar     = createBaseMap('radarMap', 'light');
  state.maps.precip    = createBaseMap('precipMap', 'dark');
  state.maps.typhoon   = createBaseMap('typhoonMap', 'dark');
  state.maps.tsunami   = createBaseMap('tsunamiMap', 'dark');
  state.maps.quake     = createBaseMap('quakeMap', 'dark');

  state.layers.weather.addTo(state.maps.forecast);
  state.layers.landslide.addTo(state.maps.landslide);
  state.layers.precip.addTo(state.maps.precip);
  state.layers.typhoon.addTo(state.maps.typhoon);
  state.layers.tsunami.addTo(state.maps.tsunami);
  state.layers.quake.addTo(state.maps.quake);
}
function initClock(){
  const update = () => {
    const now = new Date();
    const dp = new Intl.DateTimeFormat('ja-JP', { timeZone:'Asia/Tokyo', year:'numeric', month:'numeric', day:'numeric' }).formatToParts(now);
    const dm = Object.fromEntries(dp.filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
    $('dateLine').textContent = `${dm.year}年${dm.month}月${dm.day}日`;
    $('timeLine').textContent = jstTimeHM(now);
  };
  update();
  setInterval(update, 1000);
}
function getSceneOrder(){
  const order = ['forecast', 'landslide', 'radar', 'precip'];
  if (state.typhoon.active) order.push('typhoon');
  if (state.tsunami.active) order.push('tsunami');
  return order;
}
function showScene(name){
  document.querySelectorAll('.scene').forEach(el => {
    el.classList.toggle('active', el.dataset.scene === name);
  });
  setTimeout(() => {
    const map = state.maps[name];
    if (map) map.invalidateSize();
  }, 350);
}
function startSceneRotation(){
  setInterval(() => {
    if (Date.now() < state.forceQuakeUntil) {
      showScene('quake');
      return;
    }
    const order = getSceneOrder();
    state.currentSceneIndex = (state.currentSceneIndex + 1) % order.length;
    showScene(order[state.currentSceneIndex]);
  }, 30000);
  showScene('forecast');
}

async function loadAreaData(){
  state.areaJson = await fetchJSON('https://www.jma.go.jp/bosai/common/const/area.json');
  const class20 = state.areaJson.class20s || {};
  state.municipalityIndex = Object.entries(class20).map(([code, v]) => ({
    code,
    pref_code: code.slice(0, 2),
    name: v.name || '',
    pref_name: (
      state.areaJson.offices?.[(v.parent || '').slice(0, 6)] ||
      state.areaJson.offices?.[`${code.slice(0,2)}0000`] ||
      {}
    ).name || ''
  }));
  state.municipalitySorted = [...state.municipalityIndex]
    .map(v => ({ ...v, norm: norm(v.name) }))
    .sort((a, b) => b.norm.length - a.norm.length);
}
async function fetchMunicipalityGeometry(item){
  if (!item?.code) return null;
  const key = `${item.pref_code}-${item.code}`;
  if (state.geometryCache.has(key)) return state.geometryCache.get(key);
  const url = `https://cdn.jsdelivr.net/gh/niiyz/JapanCityGeoJson@master/geojson/${item.pref_code}/${item.code}.json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const geo = await res.json();
  state.geometryCache.set(key, geo);
  return geo;
}
function matchMunicipalityByAddress(addr=''){
  const n = norm(addr);
  for (const item of state.municipalitySorted) {
    if (!item.norm) continue;
    if (n.startsWith(item.norm) || n.includes(item.norm)) return item;
  }
  return null;
}

async function updateWeather(){
  const items = await Promise.all(MAJOR_CITIES.map(async (city) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code&timezone=Asia%2FTokyo`;
    const data = await fetchJSON(url);
    return {
      ...city,
      temp: Math.round(data.current?.temperature_2m ?? 0),
      code: data.current?.weather_code ?? 0
    };
  }));
  state.weatherItems = items;
  renderWeatherMarkers();
  buildTicker();
  buildWeatherBulletins();
}
function renderWeatherMarkers(){
  state.layers.weather.clearLayers();
  for (const item of state.weatherItems) {
    const [icon, label] = weatherIcon(item.code);
    const tf = CITY_LABEL_TRANSFORM[item.name] || 'translate(0,0)';
    const html = `
      <div class="weather-wrap" style="transform:${tf}">
        <div class="weather-label">
          <span class="icon">${icon}</span>
          <div>${item.name}</div>
          <div class="temp">${item.temp}℃</div>
        </div>
      </div>
    `;
    L.marker([item.lat, item.lon], {
      icon: L.divIcon({ className:'', html, iconSize:[74,58], iconAnchor:[37,29] })
    }).bindTooltip(`${item.name} ${label}`).addTo(state.layers.weather);
  }
}

async function updateAmedas(){
  if (!state.amedasStations) {
    state.amedasStations = await fetchJSON('https://www.jma.go.jp/bosai/amedas/const/amedastable.json');
  }
  const latest = (await fetch('https://www.jma.go.jp/bosai/amedas/data/latest_time.txt').then(r => r.text())).trim();
  const ts = latest.replace(/[-:T+]/g, '').slice(0, 14);
  const mapData = await fetchJSON(`https://www.jma.go.jp/bosai/amedas/data/map/${ts}.json`);

  const ranking = Object.entries(mapData)
    .map(([code, v]) => {
      const station = state.amedasStations[code];
      const mm = Number(v?.precipitation1h?.[0] ?? -1);
      if (!station || mm < 0) return null;
      return {
        code,
        name: station.kjName || station.enName || code,
        lat: toDecimalDM(station.lat),
        lon: toDecimalDM(station.lon),
        mm
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.mm - a.mm)
    .slice(0, 10);

  state.precipRanking = ranking;
  renderPrecipRanking(latest);
  renderPrecipMarkers();
  buildTicker();
  buildWeatherBulletins();
}
function renderPrecipRanking(latest){
  $('precipUpdatedAt').textContent = `観測 ${fmtDateTime(latest)}`;
  const rows = state.precipRanking.length
    ? state.precipRanking.map((v, i) => `
        <div class="rank-row">
          <div class="rank-no">${i + 1}</div>
          <div class="rank-name">${v.name}</div>
          <div class="rank-mm">${v.mm.toFixed(1)}mm</div>
        </div>
      `).join('')
    : `<div class="rank-row"><div class="rank-no">-</div><div class="rank-name">データなし</div><div class="rank-mm">-</div></div>`;
  $('precipRankingList').innerHTML = rows;
}
function renderPrecipMarkers(){
  state.layers.precip.clearLayers();
  const bounds = [];
  state.precipRanking.forEach(v => {
    if (v.lat == null || v.lon == null) return;
    const layer = L.circleMarker([v.lat, v.lon], {
      radius: Math.max(8, Math.min(18, 7 + v.mm)),
      color:'#fff',
      weight:1.5,
      fillColor:'#4fc3f7',
      fillOpacity:.75
    }).bindTooltip(`${v.name} 1時間 ${v.mm.toFixed(1)}mm`);
    layer.addTo(state.layers.precip);
    L.marker([v.lat, v.lon], {
      icon: L.divIcon({
        className:'',
        html:`<div class="precip-badge">${v.mm.toFixed(1)}mm</div>`,
        iconSize:[58,24],
        iconAnchor:[29,12]
      })
    }).addTo(state.layers.precip);
    bounds.push(layer.getLatLng());
  });
  if (bounds.length) state.maps.precip.fitBounds(L.latLngBounds(bounds).pad(.35));
  else state.maps.precip.fitBounds(JAPAN_BOUNDS);
}

function buildTicker(){
  const weatherSeg = state.weatherItems.map(v => {
    const [icon, label] = weatherIcon(v.code);
    return `${v.name} ${icon} ${label} ${v.temp}℃`;
  }).join('　｜　');

  const rainSeg = state.precipRanking.slice(0, 5).map(v => {
    return `${v.name} 1時間 ${v.mm.toFixed(1)}mm`;
  }).join('　｜　');

  const combined = [weatherSeg, rainSeg ? `1時間降水量 ${rainSeg}` : '1時間降水量 データ取得中']
    .filter(Boolean).join('　｜　');

  $('tickerTrack').textContent = `${combined}　｜　${combined}`;
}
function buildWeatherBulletins(extra=[]){
  const items = [];
  extra.forEach(v => items.push(v));

  if (state.typhoon.active && state.typhoon.summary) items.push(state.typhoon.summary);

  state.precipRanking.slice(0, 3).forEach(v => {
    items.push(`雨量 ${truncate(v.name, 10)} ${v.mm.toFixed(1)}mm`);
  });

  if (!items.length && state.weatherItems.length) {
    state.weatherItems.slice(0, 4).forEach(v => {
      const [, label] = weatherIcon(v.code);
      items.push(`${v.name} ${label} ${v.temp}℃`);
    });
  }

  state.weatherBulletins = items.length ? items : ['最新の気象情報はありません'];
  $('bulletinBox').textContent = state.weatherBulletins[0];
}
function rotateBulletins(){
  let idx = 0;
  setInterval(() => {
    if (!state.weatherBulletins.length) return;
    idx = (idx + 1) % state.weatherBulletins.length;
    $('bulletinBox').textContent = state.weatherBulletins[idx];
  }, 8000);
}

function getHighestWarningInfo(codes){
  for (const rule of LANDSLIDE_COLOR_RULES) {
    const hit = codes.find(c => rule.codes.includes(String(c)));
    if (hit) return { code:String(hit), color:rule.color, label:rule.label };
  }
  return null;
}
async function updateWarnings(){
  const offices = Object.keys(state.areaJson?.offices || {}).sort();
  const reports = (await Promise.all(
    offices.map(code =>
      fetch(`https://www.jma.go.jp/bosai/warning/data/r8/${code}.json`)
        .then(r => r.json())
        .catch(() => null)
    )
  )).filter(Boolean);

  const activeMap = new Map();
  const bulletins = [];

  for (const report of reports) {
    if (report.headlineText) bulletins.push(truncate(report.headlineText, 22));
    const class20 = report.warning?.class20Items || [];
    for (const item of class20) {
      const activeCodes = (item.kinds || [])
        .filter(k => k.code && !['解除', '発表警報・注意報はなし'].includes(k.status))
        .map(k => String(k.code));

      if (!activeCodes.length) continue;
      const picked = getHighestWarningInfo(activeCodes);
      if (!picked) continue;

      const muni = state.municipalityIndex.find(v => v.code === item.areaCode);
      if (!muni) continue;
      activeMap.set(item.areaCode, { ...muni, ...picked });
    }
  }

  state.activeWarnings = activeMap;
  await renderLandslideLayer();
  buildWeatherBulletins(bulletins.slice(0, 6));
}
async function renderLandslideLayer(){
  state.layers.landslide.clearLayers();

  if (!state.activeWarnings?.size) {
    $('landslideEmpty').classList.remove('hidden');
    return;
  }
  $('landslideEmpty').classList.add('hidden');

  const entries = [...state.activeWarnings.values()];
  const geos = await Promise.all(entries.map(fetchMunicipalityGeometry));

  geos.forEach((geo, i) => {
    if (!geo) return;
    const item = entries[i];
    L.geoJSON(geo, {
      style: {
        color:'#fff',
        weight:.8,
        fillColor:item.color,
        fillOpacity:item.color === '#fdd835' ? .72 : .78
      }
    }).bindTooltip(`${item.pref_name}${item.name} ${item.label}`).addTo(state.layers.landslide);
  });
}

async function updateRadarLayer(){
  try {
    const json = await fetchJSON('https://api.rainviewer.com/public/weather-maps.json');
    const latest = json.radar?.past?.at(-1) || json.radar?.nowcast?.[0];
    if (!latest) return;

    const url = `https://tilecache.rainviewer.com${latest.path}/256/{z}/{x}/{y}/6/1_1.png`;
    if (state.layers.radar) state.maps.radar.removeLayer(state.layers.radar);
    state.layers.radar = L.tileLayer(url, { opacity:.75, maxZoom:10 });
    state.layers.radar.addTo(state.maps.radar);
  } catch (e) {
    console.error('radar', e);
  }
}

async function updateTyphoon(){
  try {
    const index = await fetchJSON('https://www.jma.go.jp/bosai/information/data/typhoon.json');
    if (!Array.isArray(index) || !index.length) {
      state.typhoon = { active:false, headline:'', summary:'', track:[] };
      return;
    }

    const latest = index[0];
    const spec = await fetchJSON(`https://www.jma.go.jp/bosai/typhoon/data/${latest.eventId}/specifications.json`);
    const titlePart = spec.find(v => v.part === 'title') || {};
    const points = spec.filter(v => Array.isArray(v.position?.deg));

    if (!points.length) {
      state.typhoon = { active:false, headline:'', summary:'', track:[] };
      return;
    }

    state.typhoon.active = true;
    state.typhoon.headline = latest.headTitle || '台風情報';
    state.typhoon.summary = `台風${titlePart.typhoonNumber || ''} ${points[0].location || ''}`;
    state.typhoon.track = points;

    renderTyphoon(points, titlePart, latest);
    buildWeatherBulletins();
  } catch (e) {
    console.error('typhoon', e);
    state.typhoon.active = false;
  }
}

function renderTyphoon(points, titlePart, latest){
  state.layers.typhoon.clearLayers();

  const latlngs = points
    .map(v => [Number(v.position.deg[0]), Number(v.position.deg[1])])
    .filter(ll => !isNaN(ll[0]) && !isNaN(ll[1]));

  if (latlngs.length) {
    L.polyline(latlngs, { color: '#7c4dff', weight: 3, dashArray: '6,6' }).addTo(state.layers.typhoon);

    const current = points[0];
    const currLatLng = [Number(current.position.deg[0]), Number(current.position.deg[1])];
    
    L.marker(currLatLng, {
      icon: L.divIcon({
        className: 'typhoon-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
    }).bindTooltip(`台風${titlePart.typhoonNumber || ''}号 (${current.intensity || '情報なし'})`).addTo(state.layers.typhoon);

    if (current.stormArea?.radius) {
      L.circle(currLatLng, {
        radius: Number(current.stormArea.radius) * 1000,
        color: '#ff1744',
        weight: 1.5,
        fillColor: '#ff1744',
        fillOpacity: 0.15
      }).addTo(state.layers.typhoon);
    }

    state.maps.typhoon.setView(currLatLng, 4.5);
  }

  const listEl = $('typhoonInfoList');
  if (listEl) {
    listEl.innerHTML = `
      <div><dt>台風番号</dt><dd>台風 ${titlePart.typhoonNumber || '-'} 号</dd></div>
      <div><dt>現在位置</dt><dd>${points[0]?.location || '-'}</dd></div>
      <div><dt>中心気圧</dt><dd>${points[0]?.pressure || '-'} hPa</dd></div>
      <div><dt>最大風速</dt><dd>${points[0]?.maxWindSpeed || '-'} m/s</dd></div>
      <div><dt>発表時刻</dt><dd>${fmtDateTime(latest.reportDatetime)}</dd></div>
    `;
  }
}

async function updateTsunami() {
  try {
    const data = await fetchJSON('https://api.p2pquake.net/v2/history?codes=552&limit=1');
    if (!data || !data.length) {
      state.tsunami.active = false;
      return;
    }
    const latest = data[0];
    if (Date.now() - new Date(latest.time).getTime() > 7200000 && !latest.cancelled) {
      state.tsunami.active = false;
      return;
    }

    if (latest.cancelled) {
      state.tsunami.active = false;
      $('tsunamiQuakeInfo').innerHTML = '<div><dd>現在、津波警報・注意報は発表されていません。</dd></div>';
      state.layers.tsunami.clearLayers();
      return;
    }

    state.tsunami.active = true;
    state.tsunami.issueTime = latest.time;
    state.tsunami.areas = latest.areas || [];
    
    renderTsunami();
  } catch (e) {
    console.error('tsunami', e);
  }
}

function renderTsunami() {
  state.layers.tsunami.clearLayers();
  const listEl = $('tsunamiAreas');
  if (!listEl) return;
  listEl.innerHTML = '';

  $('tsunamiQuakeInfo').innerHTML = `<div><dt>発表時刻</dt><dd>${state.tsunami.issueTime}</dd></div>`;

  state.tsunami.areas.forEach(area => {
    const grade = TSUNAMI_GRADE[area.grade] || TSUNAMI_GRADE.Unknown;
    
    const div = document.createElement('div');
    div.className = 'tsunami-area';
    div.style.borderLeft = `6px solid ${grade.color}`;
    div.innerHTML = `<strong>${area.name}</strong><small>${grade.label} ${area.immediate ? '｜ 直ちに襲来' : ''}</small>`;
    listEl.appendChild(div);

    const pt = TSUNAMI_AREA_POINTS[area.name];
    if (pt) {
      L.circleMarker(pt, {
        radius: 10,
        color: '#fff',
        weight: 1.5,
        fillColor: grade.color,
        fillOpacity: 0.9
      }).bindTooltip(`${area.name}：${grade.label}`).addTo(state.layers.tsunami);
    }
  });
}

async function updateQuake() {
  try {
    const data = await fetchJSON('https://api.p2pquake.net/v2/history?codes=551&limit=1');
    if (!data || !data.length) return;
    const eq = data[0];
    if (eq.id === state.lastQuakeId) return;
    state.lastQuakeId = eq.id;

    const info = eq.earthquake || {};
    $('quakeMaxScale').textContent = scaleLabel(info.maxScale);
    $('quakeHypo').textContent = info.hypocenter?.name || '不明';
    $('quakeMag').textContent = info.hypocenter?.magnitude != null ? `M${info.hypocenter.magnitude}` : '不明';
    $('quakeDepth').textContent = depthLabel(info.hypocenter?.depth);
    $('quakeTime').textContent = info.time || '-';

    const obsListEl = $('quakeObservedList');
    obsListEl.innerHTML = '';
    const points = eq.points || [];
    
    const scaleGroups = {};
    points.forEach(p => {
      if (!scaleGroups[p.scale]) scaleGroups[p.scale] = [];
      scaleGroups[p.scale].push(p.addr);
    });

    Object.keys(scaleGroups).sort((a,b) => b - a).forEach(scale => {
      const color = SCALE_COLOR[scale] || '#555';
      const label = scaleLabel(scale);
      const div = document.createElement('div');
      div.style.width = '100%';
      div.style.marginBottom = '6px';
      div.innerHTML = `<span class="obs-chip" style="background:${color}; margin-right:6px;">震度${label}</span><span style="font-size:14px; color:#e0e0e0;">${truncate(scaleGroups[scale].join(' '), 40)}</span>`;
      obsListEl.appendChild(div);
    });

    state.layers.quake.clearLayers();
    if (info.hypocenter?.latitude && info.hypocenter?.longitude) {
      const center = [info.hypocenter.latitude, info.hypocenter.longitude];
      
      L.marker(center, {
        icon: L.divIcon({
          className: '',
          html: `<div style="color:#e53935; font-size:32px; font-weight:900; transform:translate(-8px,-22px);">×</div>`,
          iconSize: [24, 24]
        })
      }).addTo(state.layers.quake);

      state.maps.quake.setView(center, 6);

      if (info.maxScale >= 30 && state.quakeInitialized) {
        state.forceQuakeUntil = Date.now() + 45000;
        showScene('quake');
      }
    }
    state.quakeInitialized = true;
  } catch (e) {
    console.error('quake', e);
  }
}

function initEEW() {
  if (state.eewInitialized) return;
  state.eewInitialized = true;

  setInterval(async () => {
    try {
      const eew = await fetchJSON('https://api.wolfx.jp/jma_eew.json');
      if (!eew || !eew.EventID) return;
      
      const key = `${eew.EventID}_${eew.Serial}`;
      if (key === state.lastEEWKey) return;
      state.lastEEWKey = key;

      const overlay = $('eewOverlay');
      if (eew.isCancel || Date.now() - parseAnyTime(eew.AnnouncedTime).getTime() > 90000) {
        overlay.classList.add('hidden');
        return;
      }

      $('eewSerial').textContent = eew.isFinal ? '最終報' : `第 ${eew.Serial} 報`;
      $('eewMaxScale').textContent = eew.MaxScale || '-';
      $('eewHypo').textContent = eew.Hypocenter || '-';
      $('eewMag').textContent = eew.Magunitude ? `M${eew.Magunitude}` : '-';
      $('eewDepth').textContent = eew.Depth ? `${eew.Depth}` : '-';
      $('eewOrigin').textContent = eew.OriginTime ? jstTimeHM(parseAnyTime(eew.OriginTime)) : '-';

      overlay.classList.remove('hidden');

    } catch (e) {
      console.error('eew-poll', e);
    }
  }, 3000);
}

function updateKyoshin() {
  const img = $('kyoshinImage');
  const meta = $('kyoshinMeta');
  if (!img) return;

  const now = new Date(Date.now() - 2000);
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const i = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  const ts = `${y}${m}${d}/${y}${m}${d}${h}${i}${s}`;
  
  img.src = `https://www.kmoni.bosai.go.jp/data/map_img/RealTimeImg/jma_s/${y}${m}${d}/${ts}.jma_s.gif`;
  meta.textContent = `リアルタイム震度：${y}年${m}月${d}日 ${h}時${i}分${s}秒`;
}

async function init() {
  initMaps();
  initClock();
  rotateBulletins();

  try {
    await loadAreaData();
    await updateWeather();
    await updateAmedas();
    await updateWarnings();
    await updateRadarLayer();
    await updateTyphoon();
    await updateTsunami();
    await updateQuake();
    initEEW();
    
    setInterval(updateWeather, 300000);
    setInterval(updateAmedas, 60000);
    setInterval(updateWarnings, 60000);
    setInterval(updateRadarLayer, 120000);
    setInterval(updateTyphoon, 120000);
    setInterval(updateTsunami, 30000);
    setInterval(updateQuake, 15000);

    startSceneRotation();

  } catch (error) {
    console.error('システム初期化エラー:', error);
    $('bulletinBox').textContent = '初期データ読込エラー。再起動してください。';
  }
}

window.addEventListener('DOMContentLoaded', init);