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

const SCALE_LABEL = { '-1':'不明', 10:'1', 20:'2', 30:'3', 40:'4', 45:'5弱', 50:'5強', 55:'6弱', 60:'6強', 70:'7' };
const SCALE_COLOR = { 10:'#4fc3f7', 20:'#29b6f6', 30:'#ffee58', 40:'#ffca28', 45:'#fb8c00', 50:'#f4511e', 55:'#e53935', 60:'#8e24aa', 70:'#6a1b9a' };

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
  areaJson: null,
  municipalityIndex: [],
  municipalitySorted: [],
  geometryCache: new Map(),
  activeWarnings: new Map(),
  weatherItems: [],
  precipRanking: [],
  weatherBulletins: ['読込中…'],
  amedasStations: null,
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
  typhoon: { active:false, headline:'', summary:'', track:[] },
  tsunami: { active:false, id:null, issueTime:'', areas:[], quake:null },
  forceQuakeUntil: 0,
  lastQuakeId: null,
  quakeInitialized: false,
  lastEEWKey: null,
  eewHideAt: 0
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
  return new Intl.DateTimeFormat('ja-JP', { timeZone:'Asia/Tokyo', year:'numeric', month:'numeric', day:'numeric' }).format(d);
}
function jstTimeHM(d=new Date()){
  const p = new Intl.DateTimeFormat('ja-JP', { timeZone:'Asia/Tokyo', hour:'numeric', minute:'2-digit', hour12:false }).formatToParts(d);
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
function toDecimalDM(arr){
  if (!Array.isArray(arr) || arr.length < 2) return null;
  return Number(arr[0]) + Number(arr[1]) / 60;
}
function escapeHtml(s=''){
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
    const p = new Intl.DateTimeFormat('ja-JP', { timeZone:'Asia/Tokyo', year:'numeric', month:'numeric', day:'numeric' }).formatToParts(now);
    const dm = Object.fromEntries(p.filter(x=>x.type!=='literal').map(x=>[x.type, x.value]));
    $('dateLine').textContent = `${dm.year}年${dm.month}月${dm.day}日`;
    $('timeLine').textContent = jstTimeHM(now);
  };
  update();
  setInterval(update, 1000);
}

function getSceneOrder(){
  const order = ['forecast', 'landslide', 'radar', 'precip'];
  if (state.typhoon.active) order.push('typhoon');
  return order;
}
function getCurrentRotationScene(){
  const order = getSceneOrder();
  return order[state.currentSceneIndex % order.length] || 'forecast';
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
function syncPriorityScene(){
  if (Date.now() < state.forceQuakeUntil) {
    showScene('quake');
    return;
  }
  if (state.tsunami.active) {
    showScene('tsunami');
    return;
  }
  const active = document.querySelector('.scene.active')?.dataset.scene;
  const normal = getCurrentRotationScene();
  if (active === 'quake' || active === 'tsunami') {
    showScene(normal);
  }
}
function startSceneRotation(){
  setInterval(() => {
    if (Date.now() < state.forceQuakeUntil) {
      showScene('quake');
      return;
    }
    if (state.tsunami.active) {
      showScene('tsunami');
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
  $('precipRankingList').innerHTML = state.precipRanking.length
    ? state.precipRanking.map((v, i) => `
        <div class="rank-row">
          <div class="rank-no">${i + 1}</div>
          <div class="rank-name">${escapeHtml(v.name)}</div>
          <div class="rank-mm">${v.mm.toFixed(1)}mm</div>
        </div>
      `).join('')
    : `<div class="rank-row"><div class="rank-no">-</div><div class="rank-name">データなし</div><div class="rank-mm">-</div></div>`;
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
  const rainSeg = state.precipRanking.slice(0, 5).map(v => `${v.name} 1時間 ${v.mm.toFixed(1)}mm`).join('　｜　');
  const combined = [weatherSeg, rainSeg ? `1時間降水量 ${rainSeg}` : '1時間降水量 データ取得中'].filter(Boolean).join('　｜　');
  $('tickerTrack').textContent = `${combined}　｜　${combined}`;
}
function buildWeatherBulletins(extra=[]){
  const items = [];
  extra.forEach(v => items.push(v));
  if (state.typhoon.active && state.typhoon.summary) items.push(state.typhoon.summary);
  state.precipRanking.slice(0, 3).forEach(v => items.push(`雨量 ${truncate(v.name, 10)} ${v.mm.toFixed(1)}mm`));
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
  const CHUNK = 10;
  const results = [];
  for (let i = 0; i < offices.length; i += CHUNK) {
    const chunk = offices.slice(i, i + CHUNK);
    const partial = await Promise.all(
      chunk.map(code => fetch(`https://www.jma.go.jp/bosai/warning/data/r8/${code}.json`).then(r => r.json()).catch(() => null))
    );
    results.push(...partial);
  }
  const reports = results.filter(Boolean);

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
  const latlngs = points.map(v => [Number(v.position.deg[0]), Number(v.position.deg[1])]).filter(ll => !isNaN(ll[0]) && !isNaN(ll[1]));
  if (latlngs.length) {
    L.polyline(latlngs, { color:'#7c4dff', weight:3, dashArray:'6,6' }).addTo(state.layers.typhoon);
    const current = points[0];
    const currLatLng = [Number(current.position.deg[0]), Number(current.position.deg[1])];
    L.marker(currLatLng, {
      icon: L.divIcon({ className:'typhoon-marker', iconSize:[30,30], iconAnchor:[15,15] })
    }).bindTooltip(`台風${titlePart.typhoonNumber || ''}号`).addTo(state.layers.typhoon);
    state.maps.typhoon.setView(currLatLng, 4.5);
  }
  $('typhoonInfoList').innerHTML = `
    <div><dt>台風番号</dt><dd>台風 ${escapeHtml(titlePart.typhoonNumber || '-')} 号</dd></div>
    <div><dt>現在位置</dt><dd>${escapeHtml(points[0]?.location || '-')}</dd></div>
    <div><dt>中心気圧</dt><dd>${escapeHtml(points[0]?.pressure || '-')} hPa</dd></div>
    <div><dt>移動</dt><dd>${escapeHtml(points[0]?.course || '-')} ${escapeHtml(points[0]?.speed?.['km/h'] || '-')} km/h</dd></div>
    <div><dt>発表時刻</dt><dd>${fmtDateTime(latest.reportDatetime)}</dd></div>
  `;
}

async function resolveTsunamiTriggerQuake(issueTime){
  try {
    const quakes = await fetchJSON('https://api.p2pquake.net/v2/jma/quake?limit=10');
    const issueTs = parseAnyTime(issueTime)?.getTime() ?? Date.now();
    let picked = null;
    let best = Infinity;
    for (const q of quakes || []) {
      const eq = q.earthquake || {};
      const t = parseAnyTime(eq.time || q.time)?.getTime();
      if (!t) continue;
      const tsunamiFlag = [eq.domesticTsunami, eq.foreignTsunami].some(v => v && !['None', 'Unknown', 'NonEffective'].includes(v));
      const diff = Math.abs(issueTs - t);
      if (!tsunamiFlag && diff > 24 * 60 * 60 * 1000) continue;
      if (diff < best) {
        best = diff;
        picked = q;
      }
    }
    return picked;
  } catch (e) {
    console.error('tsunami-trigger-quake', e);
    return null;
  }
}
async function updateTsunami(){
  try {
    const data = await fetchJSON('https://api.p2pquake.net/v2/jma/tsunami?limit=1');
    if (!Array.isArray(data) || !data.length) {
      state.tsunami = { active:false, id:null, issueTime:'', areas:[], quake:null };
      syncPriorityScene();
      return;
    }
    const latest = data[0];
    if (latest.cancelled || !latest.areas?.length) {
      const wasActive = state.tsunami.active;
      state.tsunami = { active:false, id:null, issueTime:'', areas:[], quake:null };
      state.layers.tsunami.clearLayers();
      $('tsunamiAreas').innerHTML = '';
      $('tsunamiQuakeInfo').innerHTML = '<div><dt>状況</dt><dd>現在、津波警報・注意報は発表されていません。</dd></div>';
      if (wasActive) syncPriorityScene();
      return;
    }

    const isNew = latest.id !== state.tsunami.id;
    const triggerQuake = isNew ? await resolveTsunamiTriggerQuake(latest.issue?.time || latest.time) : state.tsunami.quake;
    state.tsunami = {
      active: true,
      id: latest.id,
      issueTime: latest.issue?.time || latest.time,
      areas: latest.areas || [],
      quake: triggerQuake || null
    };
    renderTsunami();
    if (isNew && Date.now() >= state.forceQuakeUntil) showScene('tsunami');
  } catch (e) {
    console.error('tsunami', e);
  }
}
function renderTsunami(){
  state.layers.tsunami.clearLayers();

  const q = state.tsunami.quake?.earthquake || {};
  $('tsunamiQuakeInfo').innerHTML = `
    <div><dt>発表時刻</dt><dd>${fmtDateTime(state.tsunami.issueTime)}</dd></div>
    <div><dt>震源</dt><dd>${escapeHtml(q.hypocenter?.name || '調査中')}</dd></div>
    <div><dt>規模</dt><dd>${q.hypocenter?.magnitude != null ? `M${q.hypocenter.magnitude}` : '調査中'}</dd></div>
    <div><dt>深さ</dt><dd>${depthLabel(q.hypocenter?.depth)}</dd></div>
    <div><dt>地震発生時刻</dt><dd>${fmtDateTime(q.time)}</dd></div>
  `;

  $('tsunamiAreas').innerHTML = state.tsunami.areas.map(area => {
    const grade = TSUNAMI_GRADE[area.grade] || TSUNAMI_GRADE.Unknown;
    const height = area.maxHeight?.description || '-';
    const arrival = area.firstHeight?.arrivalTime ? fmtDateTime(area.firstHeight.arrivalTime) : (area.firstHeight?.condition || (area.immediate ? 'ただちに到達と予想' : '-'));
    return `
      <div class="tsunami-area" style="border-left:6px solid ${grade.color}">
        <strong>${escapeHtml(area.name)}</strong>
        <small>${escapeHtml(grade.label)} ｜ 予想高さ ${escapeHtml(height)} ｜ 到達 ${escapeHtml(arrival)}</small>
      </div>
    `;
  }).join('');

  const bounds = [];
  state.tsunami.areas.forEach(area => {
    const grade = TSUNAMI_GRADE[area.grade] || TSUNAMI_GRADE.Unknown;
    const pt = TSUNAMI_AREA_POINTS[area.name];
    if (!pt) return;
    const marker = L.circleMarker(pt, {
      radius: 12,
      color: '#fff',
      weight: 2,
      fillColor: grade.color,
      fillOpacity: 0.92
    }).bindTooltip(`${area.name}：${grade.label} / ${area.maxHeight?.description || '-'} / ${area.firstHeight?.arrivalTime || area.firstHeight?.condition || '-'}`);
    marker.addTo(state.layers.tsunami);
    bounds.push(marker.getLatLng());
  });
  if (bounds.length) state.maps.tsunami.fitBounds(L.latLngBounds(bounds).pad(.25));
  else state.maps.tsunami.fitBounds(JAPAN_BOUNDS);
}

function hideEEW(){
  $('eewOverlay').classList.add('hidden');
  state.eewHideAt = 0;
}
function showEEWCard(eew){
  $('eewSerial').textContent = eew.isFinal ? '最終報' : `第 ${eew.Serial || '?'} 報`;
  $('eewMaxScale').textContent = eew.MaxIntensity || eew.MaxScale || '-';
  $('eewHypo').textContent = eew.Hypocenter || '-';
  $('eewMag').textContent = eew.Magnitude != null ? `M${eew.Magnitude}` : (eew.Magunitude != null ? `M${eew.Magunitude}` : '-');
  $('eewDepth').textContent = depthLabel(Number(eew.Depth));
  $('eewOrigin').textContent = fmtDateTime(eew.OriginTime || eew.AnnouncedTime);
  $('eewOverlay').classList.remove('hidden');
}
function startEEWPolling(){
  setInterval(async () => {
    try {
      const eew = await fetchJSON('https://api.wolfx.jp/jma_eew.json', { cache:'no-store' });
      if (!eew?.EventID) {
        if (state.eewHideAt && Date.now() >= state.eewHideAt) hideEEW();
        return;
      }

      const status = String(eew?.Issue?.Status || '');
      const isCancel = Boolean(eew.isCancel) || status.includes('キャンセル');
      const key = `${eew.EventID}_${eew.Serial || ''}_${eew.AnnouncedTime || ''}`;

      if (isCancel) {
        hideEEW();
        state.lastEEWKey = key;
        return;
      }

      if (key !== state.lastEEWKey) {
        state.lastEEWKey = key;
        showEEWCard(eew);
        state.eewHideAt = eew.isFinal ? Date.now() + 30000 : 0;
      } else if (state.eewHideAt && Date.now() >= state.eewHideAt) {
        hideEEW();
      }
    } catch (e) {
      console.error('eew', e);
    }
  }, 3000);
}

function groupPointsByScale(points){
  const groups = new Map();
  for (const p of points || []) {
    const s = Number(p.scale || 0);
    if (!groups.has(s)) groups.set(s, []);
    groups.get(s).push(p);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}
async function renderQuake(eq){
  const info = eq.earthquake || {};
  $('quakeMaxScale').textContent = scaleLabel(info.maxScale);
  $('quakeHypo').textContent = info.hypocenter?.name || '不明';
  $('quakeMag').textContent = info.hypocenter?.magnitude != null ? `M${info.hypocenter.magnitude}` : '不明';
  $('quakeDepth').textContent = depthLabel(info.hypocenter?.depth);
  $('quakeTime').textContent = fmtDateTime(info.time || eq.time);

  const obs = $('quakeObservedList');
  obs.innerHTML = '';
  const groups = groupPointsByScale(eq.points || []);
  groups.forEach(([scale, arr]) => {
    const div = document.createElement('div');
    div.style.width = '100%';
    div.style.marginBottom = '8px';
    const names = arr.map(v => v.addr).filter(Boolean).join('、');
    div.innerHTML = `<span class="obs-chip" style="background:${SCALE_COLOR[scale] || '#546e7a'};margin-right:6px;">震度${scaleLabel(scale)}</span><span style="font-size:14px;color:#e0e0e0;">${escapeHtml(truncate(names, 52))}</span>`;
    obs.appendChild(div);
  });

  state.layers.quake.clearLayers();

  const muniScale = new Map();
  const geocodeFallback = [];
  for (const p of eq.points || []) {
    const muni = matchMunicipalityByAddress(p.addr || '');
    if (muni) {
      const prev = muniScale.get(muni.code);
      if (!prev || Number(p.scale || 0) > Number(prev.scale || 0)) muniScale.set(muni.code, { ...muni, scale:Number(p.scale || 0), addr:p.addr, pref:p.pref });
    } else {
      geocodeFallback.push(p);
    }
  }

  const fills = [...muniScale.values()];
  const geos = await Promise.all(fills.map(fetchMunicipalityGeometry));
  const bounds = [];
  geos.forEach((geo, i) => {
    if (!geo) return;
    const item = fills[i];
    const layer = L.geoJSON(geo, {
      style: {
        color:'#ffffff',
        weight:0.9,
        fillColor:SCALE_COLOR[item.scale] || '#78909c',
        fillOpacity:0.88
      }
    }).bindTooltip(`${item.pref || item.pref_name || ''} ${item.addr || item.name} 震度${scaleLabel(item.scale)}`);
    layer.addTo(state.layers.quake);
    try { bounds.push(layer.getBounds()); } catch (_) {}
  });

  const epicenterLat = Number(info.hypocenter?.latitude);
  const epicenterLon = Number(info.hypocenter?.longitude);
  if (!Number.isNaN(epicenterLat) && !Number.isNaN(epicenterLon)) {
    const epi = L.marker([epicenterLat, epicenterLon], {
      icon: L.divIcon({
        className:'',
        html:'<div style="color:#ff3b30;font-size:34px;font-weight:900;transform:translate(-8px,-22px);">×</div>',
        iconSize:[24,24],
        iconAnchor:[12,12]
      })
    }).bindTooltip(`震源 ${info.hypocenter?.name || ''}`);
    epi.addTo(state.layers.quake);
  }

  geocodeFallback.slice(0, 30).forEach(p => {
    const pref = String(p.pref || '').replace(/県|府|都|道/g, '');
    const hit = MAJOR_CITIES.find(v => pref && v.name.includes(pref));
    if (!hit) return;
    L.circleMarker([hit.lat, hit.lon], {
      radius: 8,
      color:'#fff',
      weight:1.5,
      fillColor:SCALE_COLOR[p.scale] || '#78909c',
      fillOpacity:0.85
    }).bindTooltip(`${p.pref || ''} ${p.addr || ''} 震度${scaleLabel(p.scale)}`).addTo(state.layers.quake);
  });

  if (bounds.length) {
    const union = bounds.reduce((acc, b) => acc.extend(b), bounds[0]);
    state.maps.quake.fitBounds(union.pad(0.25));
  } else if (!Number.isNaN(epicenterLat) && !Number.isNaN(epicenterLon)) {
    state.maps.quake.setView([epicenterLat, epicenterLon], 5.5);
  } else {
    state.maps.quake.fitBounds(JAPAN_BOUNDS);
  }
}
async function updateQuake(){
  try {
    const data = await fetchJSON('https://api.p2pquake.net/v2/jma/quake?limit=1');
    if (!Array.isArray(data) || !data.length) return;
    const eq = data[0];
    if (!eq?.id) return;

    const isNew = eq.id !== state.lastQuakeId;
    state.lastQuakeId = eq.id;
    await renderQuake(eq);

    if (!state.quakeInitialized) {
      state.quakeInitialized = true;
      return;
    }
    if (!isNew) return;

    hideEEW();
    state.forceQuakeUntil = Date.now() + 60000;
    showScene('quake');
  } catch (e) {
    console.error('quake', e);
  }
}

async function init(){
  initMaps();
  initClock();
  rotateBulletins();

  // シーンローテーションとポーリングは必ず起動する
  startSceneRotation();
  startEEWPolling();
  setInterval(updateWeather, 300000);
  setInterval(updateAmedas, 60000);
  setInterval(updateWarnings, 60000);
  setInterval(updateRadarLayer, 120000);
  setInterval(updateTyphoon, 120000);
  setInterval(updateTsunami, 15000);
  setInterval(updateQuake, 5000);
  setInterval(syncPriorityScene, 1000);

  try {
    await loadAreaData();
  } catch (error) {
    console.error('エリアデータ読込エラー:', error);
    $('bulletinBox').textContent = 'エリアデータ読込エラー。警告・地震情報が制限されます。';
  }

  await Promise.allSettled([
    updateWeather(),
    updateAmedas(),
    updateWarnings(),
    updateRadarLayer(),
    updateTyphoon(),
    updateTsunami(),
    updateQuake()
  ]);
}

window.addEventListener('DOMContentLoaded', init);
