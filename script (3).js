"use strict";
// =============================================================================
// RENNESMOOV — SCRIPT PRINCIPAL v2.0
// Architecture : Modules statiques + API Mocking async
// Auteur : Flavien Gaude — Universite de Rennes 1
// =============================================================================

const DB = {
  zones: {
    gayeulles:  { name: "Parc des Gayeulles",   coords: [48.136, -1.642], icon: "\u{1F332}", color: "#2D6A4F" },
    thabor:     { name: "Parc du Thabor",        coords: [48.114, -1.666], icon: "\u{1F333}", color: "#40916C" },
    beaulieu:   { name: "Campus de Beaulieu",    coords: [48.118, -1.637], icon: "\u{1F3DB}", color: "#52B788" },
    apigne:     { name: "Bois d'Apigne",         coords: [48.098, -1.735], icon: "\u{1F30A}", color: "#3182CE" },
    stmartin:   { name: "Foret St-Martin",       coords: [48.127, -1.682], icon: "\u{1F33F}", color: "#2D6A4F" },
    soeuvres:   { name: "Bois de Soeuvres",      coords: [48.090, -1.740], icon: "\u{1F342}", color: "#74C69D" },
    rheu:       { name: "Bois du Rheu",          coords: [48.069, -1.793], icon: "\u{1F33E}", color: "#52B788" },
    lifre:      { name: "Foret de Liffre",       coords: [48.212, -1.512], icon: "\u{1F3D5}", color: "#1B4332" },
    teillay:    { name: "Foret de Teillay",      coords: [47.968, -1.501], icon: "\u{1F340}", color: "#40916C" },
    beauregard: { name: "Bois de Beauregard",    coords: [48.137, -1.690], icon: "\u{1F33B}", color: "#74C69D" },
  },

  trails: [
    { id:"gay-1",  zone:"gayeulles",  title:"La Ceinture Forestiere",    pace:"footing", level:"intermediaire", duration:55, kcal:520, distance:6.2, elevation:42,  eau:true,  ombre:80, accessible:false, img:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", desc:"Un grand classique du Gayeulles. Alternance de chemins forestiers denses et d'allees degagees. Ideal pour un footing regulier.", usersNow:8,  avgRating:4.7, ratings:143, waypoints:[{title:"Depart parking nord",desc:"Parking gratuit, toilettes.",lat:48.1365,lng:-1.6420},{title:"Point d'eau fontaine",desc:"Fontaine publique.",lat:48.1380,lng:-1.6390},{title:"Montee des Pins",desc:"200m sous-bois dense.",lat:48.1395,lng:-1.6355}] },
    { id:"gay-2",  zone:"gayeulles",  title:"Au Coeur des Gayeulles",    pace:"trail",   level:"confirme",      duration:30, kcal:600, distance:4.8, elevation:85,  eau:false, ombre:95, accessible:false, img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", desc:"Le parcours le plus technique du Gayeulles. Passages en foret dense, racines. Reserve aux coureurs confirmes.", usersNow:4, avgRating:4.9, ratings:87,  waypoints:[{title:"Sentier est",desc:"Chemin etroit.",lat:48.1360,lng:-1.6400},{title:"Descente technique",desc:"40m instable.",lat:48.1370,lng:-1.6370}] },
    { id:"gay-3",  zone:"gayeulles",  title:"Le Defi des Collines",      pace:"trail",   level:"intermediaire", duration:40, kcal:430, distance:5.1, elevation:60,  eau:true,  ombre:70, accessible:false, img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", desc:"Parcours de cotes. Montees explosives, descentes maitrisees. Excellent cardiovasculaire.", usersNow:6, avgRating:4.5, ratings:112, waypoints:[{title:"Depart allee centrale",desc:"Repere : panneau info.",lat:48.1358,lng:-1.6430}] },
    { id:"gay-4",  zone:"gayeulles",  title:"Le Sentier Nocturne",       pace:"footing", level:"confirme",      duration:25, kcal:320, distance:3.2, elevation:28,  eau:false, ombre:100,accessible:false, img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", desc:"Ideal pour les footings du soir. Chemins bien entretenus, lampe frontale recommandee.", usersNow:2, avgRating:4.3, ratings:54,  waypoints:[{title:"Entree nord eclairee",desc:"Seule entree avec eclairage.",lat:48.1378,lng:-1.6415}] },
    { id:"thab-1", zone:"thabor",     title:"Le Circuit des Marches",    pace:"footing", level:"intermediaire", duration:35, kcal:400, distance:4.0, elevation:35,  eau:true,  ombre:60, accessible:true,  img:"https://images.unsplash.com/photo-1508349937151-22b68b72d5b1?auto=format&fit=crop&w=800&q=80", desc:"Le Thabor et ses escaliers iconiques. Course urbaine avec denivele progressif. Populaire le midi.", usersNow:12, avgRating:4.6, ratings:298, waypoints:[{title:"Escaliers est",desc:"72 marches en pierre.",lat:48.1145,lng:-1.6655},{title:"Fontaine du Thabor",desc:"Point d'eau potable.",lat:48.1152,lng:-1.6635}] },
    { id:"thab-2", zone:"thabor",     title:"Tour du Thabor Express",    pace:"footing", level:"debutant",      duration:20, kcal:280, distance:2.5, elevation:15,  eau:true,  ombre:65, accessible:true,  img:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80", desc:"2 tours du parc. Parfait pour debutants ou recuperation active. Sol souple.", usersNow:18, avgRating:4.4, ratings:387, waypoints:[{title:"Entree principale",desc:"Parking Thabor 200m.",lat:48.1138,lng:-1.6668}] },
    { id:"beau-1", zone:"beaulieu",   title:"Beton et Verdure",          pace:"footing", level:"intermediaire", duration:40, kcal:350, distance:4.5, elevation:20,  eau:true,  ombre:40, accessible:true,  img:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80", desc:"Le run du campus. Melange de chemins asphaltes et d'espaces verts. Populaire etudiants.", usersNow:9, avgRating:4.1, ratings:201, waypoints:[{title:"ESIR depart",desc:"Devant ESIR.",lat:48.1185,lng:-1.6378}] },
    { id:"beau-2", zone:"beaulieu",   title:"Le Parcours STAPS",         pace:"footing", level:"intermediaire", duration:30, kcal:330, distance:3.8, elevation:12,  eau:true,  ombre:45, accessible:false, img:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", desc:"Concu par les etudiants STAPS. Navettes, fractionne, renforcement. Equipements sportifs campus.", usersNow:7, avgRating:4.2, ratings:89,  waypoints:[{title:"Gymnase STAPS",desc:"Vestiaires accessibles.",lat:48.1190,lng:-1.6390}] },
    { id:"apig-1", zone:"apigne",     title:"Le Tour des Etangs",        pace:"footing", level:"intermediaire", duration:45, kcal:380, distance:5.5, elevation:18,  eau:true,  ombre:55, accessible:true,  img:"https://images.unsplash.com/photo-1500829243541-74b677fecc30?auto=format&fit=crop&w=800&q=80", desc:"Le long des etangs d'Apigne. Sol souple, cadre bucolique. Accessible poussettes.", usersNow:11, avgRating:4.8, ratings:256, waypoints:[{title:"Parking des Etangs",desc:"Gratuit, sanitaires.",lat:48.0982,lng:-1.7348},{title:"Grand etang nord",desc:"Vue panoramique.",lat:48.0995,lng:-1.7325}] },
    { id:"apig-2", zone:"apigne",     title:"L'Aquatique Challenge",     pace:"trail",   level:"confirme",      duration:50, kcal:460, distance:6.8, elevation:35,  eau:true,  ombre:50, accessible:false, img:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", desc:"Tour complet des deux grands etangs avec passages sur les digues et chemins de terre.", usersNow:4, avgRating:4.5, ratings:118, waypoints:[{title:"Base nautique",desc:"Location kayaks.",lat:48.0978,lng:-1.7360}] },
    { id:"soeu-1", zone:"soeuvres",   title:"La Traversee de Soeuvres",  pace:"trail",   level:"confirme",      duration:60, kcal:570, distance:7.5, elevation:72,  eau:false, ombre:92, accessible:false, img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", desc:"Traversee integrale du bois de Soeuvres. Sentiers peu balises, nature sauvage. Emporter une carte.", usersNow:3, avgRating:4.6, ratings:78,  waypoints:[{title:"Entree route de Vannes",desc:"Entree non officielle.",lat:48.0905,lng:-1.7402},{title:"Carrefour des chenes",desc:"Point central.",lat:48.0920,lng:-1.7378}] },
    { id:"soeu-2", zone:"soeuvres",   title:"Les Sous-Bois Caches",      pace:"marche",  level:"intermediaire", duration:45, kcal:420, distance:5.2, elevation:40,  eau:false, ombre:88, accessible:false, img:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", desc:"Marche nordique en sous-bois. Itineraire fleche. Sol varie entre fougeres et litiere.", usersNow:5, avgRating:4.4, ratings:93,  waypoints:[{title:"Lisiere nord",desc:"Panneau de depart.",lat:48.0912,lng:-1.7390}] },
    { id:"soeu-3", zone:"soeuvres",   title:"Les Clairiers de Soeuvres", pace:"footing", level:"intermediaire", duration:35, kcal:380, distance:4.1, elevation:38,  eau:false, ombre:75, accessible:false, img:"https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", desc:"Enchainement de clairiers reliees par des sentiers ombraged. Parfait pour du fractionne nature.", usersNow:2, avgRating:4.3, ratings:61,  waypoints:[{title:"Clairiere 1",desc:"Grande clairiere.",lat:48.0900,lng:-1.7385}] },
    { id:"rheu-1", zone:"rheu",       title:"Le Circuit du Rheu",        pace:"footing", level:"intermediaire", duration:55, kcal:490, distance:6.5, elevation:48,  eau:false, ombre:65, accessible:false, img:"https://images.unsplash.com/photo-1534774867929-7763fcfe95c0?auto=format&fit=crop&w=800&q=80", desc:"Melange de sentiers forestiers et chemins bocagers. Faible frequentation.", usersNow:3, avgRating:4.2, ratings:74,  waypoints:[{title:"Centre bourg du Rheu",desc:"Parking gratuit.",lat:48.0695,lng:-1.7930}] },
    { id:"rheu-2", zone:"rheu",       title:"La Traversee Forestiere",   pace:"footing", level:"confirme",      duration:45, kcal:410, distance:5.8, elevation:30,  eau:false, ombre:80, accessible:false, img:"https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80", desc:"3km de trail forestier en continu. Parfait pour l'endurance fondamentale.", usersNow:2, avgRating:4.4, ratings:59,  waypoints:[{title:"Entree foret du Rheu",desc:"Panneau vert.",lat:48.0708,lng:-1.7920}] },
    { id:"lifr-1", zone:"lifre",      title:"L'Expedition Nordique",     pace:"trail",   level:"expert",        duration:75, kcal:660, distance:9.2, elevation:110, eau:false, ombre:90, accessible:false, img:"https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", desc:"L'aventure de Liffre. 9km en foret primaire bretonne. Emporter eau et carte detaillee.", usersNow:2, avgRating:4.8, ratings:63,  waypoints:[{title:"Parking foret",desc:"Toilettes seches.",lat:48.2125,lng:-1.5125},{title:"Zone de rochers",desc:"Passages techniques.",lat:48.2165,lng:-1.5068}] },
    { id:"lifr-2", zone:"lifre",      title:"Le Chemin des Korrigans",   pace:"trail",   level:"confirme",      duration:50, kcal:490, distance:6.1, elevation:58,  eau:false, ombre:85, accessible:false, img:"https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80", desc:"Un parcours hors du temps en foret de Liffre. Sentiers sinueux entre chenes centenaires.", usersNow:3, avgRating:4.9, ratings:91,  waypoints:[{title:"Allee des Hetres",desc:"Voute naturelle.",lat:48.2118,lng:-1.5138}] },
    { id:"lifr-3", zone:"lifre",      title:"La Diagonale des Hetres",   pace:"footing", level:"confirme",      duration:60, kcal:530, distance:7.2, elevation:65,  eau:false, ombre:88, accessible:false, img:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", desc:"Diagonale traversant la hetraie ancienne. Terrain bien balise, montees regulieres.", usersNow:4, avgRating:4.6, ratings:102, waypoints:[{title:"Lisiere ouest",desc:"Entree principale.",lat:48.2108,lng:-1.5148}] },
    { id:"breg-1", zone:"beauregard", title:"Le Parcours Beauregard",    pace:"marche",  level:"debutant",      duration:30, kcal:280, distance:3.0, elevation:12,  eau:false, ombre:70, accessible:true,  img:"https://i.ibb.co/6cKjjJzS/Parc-de-Beauregard-Quinc-1.jpg",                                      desc:"Le parcours d'initiation de Beauregard. Ideal debutants, accessible PMR. En famille.", usersNow:6, avgRating:4.3, ratings:168, waypoints:[{title:"Entree Beauregard",desc:"Parking disponible.",lat:48.1372,lng:-1.6901},{title:"Muret d'equilibre",desc:"Exercice optionnel.",lat:48.1382,lng:-1.6885}] },
  ],

  users: [
    { id:1,  name:"Lea Martin",         handle:"@lea_trail",      grade:"L3 STAPS",   zone:"gayeulles",  pace:"trail",   xp:25800, img:"https://i.pravatar.cc/150?img=47", online:true,  lastSeen:"En cours",     color:"#a855f7", bio:"Trail runner passionnee. Gayeulles tous les soirs.", avails:["soir","weekend"] },
    { id:2,  name:"Antoine Dubois",      handle:"@antorun",        grade:"M1 STAPS",   zone:"thabor",     pace:"footing", xp:21400, img:"https://i.pravatar.cc/150?img=11", online:true,  lastSeen:"En cours",     color:"#3b82f6", bio:"Coach sportif. Footing doux le midi.", avails:["midi","soir"] },
    { id:3,  name:"Marc Bernard",        handle:"@marc_forest",    grade:"L2 Maths",   zone:"stmartin",   pace:"trail",   xp:19200, img:"https://i.pravatar.cc/150?img=15", online:true,  lastSeen:"Il y a 5 min", color:"#d97706", bio:"L2 Maths. Trail et nature.", avails:["matin","soir"] },
    { id:4,  name:"Sophie Girard",       handle:"@soph_nature",    grade:"L1 Bio",     zone:"apigne",     pace:"marche",  xp:18800, img:"https://i.pravatar.cc/150?img=25", online:false, lastSeen:"Il y a 1h",    color:"#ec4899", bio:"Marche nordique et yoga.", avails:["matin","weekend"] },
    { id:5,  name:"Hugo Lefevre",        handle:"@hugo_campus",    grade:"L2 INFO",    zone:"beaulieu",   pace:"footing", xp:14200, img:"https://i.pravatar.cc/150?img=13", online:true,  lastSeen:"En cours",     color:"#3b82f6", bio:"Dev + runner campus.", avails:["midi"] },
    { id:6,  name:"Camille Moreau",      handle:"@cam_run",        grade:"M2 Sport",   zone:"gayeulles",  pace:"trail",   xp:13900, img:"https://i.pravatar.cc/150?img=32", online:true,  lastSeen:"En cours",     color:"#6366f1", bio:"Prepa ultra-trail. 80km/semaine.", avails:["matin","soir","weekend"] },
    { id:7,  name:"Julien Petit",        handle:"@juju_marche",    grade:"L3 Droit",   zone:"thabor",     pace:"marche",  xp:12400, img:"https://i.pravatar.cc/150?img=17", online:false, lastSeen:"Il y a 2h",    color:"#f97316", bio:"Marche active Thabor.", avails:["midi"] },
    { id:8,  name:"Emma Rousseau",       handle:"@emma_foret",     grade:"L1 STAPS",   zone:"gayeulles",  pace:"footing", xp:11200, img:"https://i.pravatar.cc/150?img=44", online:true,  lastSeen:"Il y a 10 min",color:"#14b8a6", bio:"STAPS L1. Footing Gayeulles.", avails:["soir","weekend"] },
    { id:9,  name:"Lucas Simon",         handle:"@luc_trail",      grade:"M1 Kine",    zone:"lifre",      pace:"trail",   xp:10800, img:"https://i.pravatar.cc/150?img=19", online:false, lastSeen:"Il y a 3h",    color:"#8b5cf6", bio:"Kine sport. Trail longue distance.", avails:["weekend"] },
    { id:10, name:"Ines Fontaine",       handle:"@ines_run",       grade:"L2 STAPS",   zone:"soeuvres",   pace:"footing", xp:10100, img:"https://i.pravatar.cc/150?img=36", online:true,  lastSeen:"En cours",     color:"#f43f5e", bio:"Footing Soeuvres tous les soirs.", avails:["soir"] },
    { id:11, name:"Thomas Laurent",      handle:"@tho_outdoor",    grade:"L3 Geo",     zone:"stmartin",   pace:"trail",   xp:9800,  img:"https://i.pravatar.cc/150?img=20", online:false, lastSeen:"Il y a 1h",    color:"#0ea5e9", bio:"Geographe et traileur.", avails:["matin","soir"] },
    { id:12, name:"Clara Dupont",        handle:"@clara_marche",   grade:"M1 STAPS",   zone:"apigne",     pace:"marche",  xp:9400,  img:"https://i.pravatar.cc/150?img=38", online:true,  lastSeen:"Il y a 8 min", color:"#22c55e", bio:"Marche nordique Apigne matin.", avails:["matin"] },
    { id:13, name:"Mathieu Picard",      handle:"@mat_footing",    grade:"L2 EPS",     zone:"rheu",       pace:"footing", xp:8900,  img:"https://i.pravatar.cc/150?img=22", online:false, lastSeen:"Il y a 4h",    color:"#f59e0b", bio:"EPS. Footing Bois du Rheu.", avails:["soir","weekend"] },
    { id:14, name:"Jade Leroy",          handle:"@jade_nature",    grade:"L1 Bio",     zone:"gayeulles",  pace:"marche",  xp:8600,  img:"https://i.pravatar.cc/150?img=40", online:true,  lastSeen:"En cours",     color:"#e879f9", bio:"Bio L1. Marche Gayeulles.", avails:["matin","midi","soir"] },
    { id:15, name:"Romain Mercier",      handle:"@rom_campus",     grade:"L3 STAPS",   zone:"beaulieu",   pace:"footing", xp:8100,  img:"https://i.pravatar.cc/150?img=12", online:false, lastSeen:"Il y a 2h",    color:"#64748b", bio:"STAPS L3. Run campus.", avails:["midi"] },
    { id:16, name:"Lucie Bonnet",        handle:"@lucie_trail",    grade:"M1 Kine",    zone:"thabor",     pace:"footing", xp:7800,  img:"https://i.pravatar.cc/150?img=49", online:true,  lastSeen:"Il y a 15 min",color:"#06b6d4", bio:"Kine. Footing therapeutique.", avails:["matin","soir"] },
    { id:17, name:"Nicolas Garnier",     handle:"@nico_forest",    grade:"L2 Maths",   zone:"stmartin",   pace:"trail",   xp:7400,  img:"https://i.pravatar.cc/150?img=18", online:false, lastSeen:"Il y a 5h",    color:"#84cc16", bio:"Matheux traileur. St-Martin.", avails:["soir","weekend"] },
    { id:18, name:"Chloe Renard",        handle:"@chloe_run",      grade:"L1 STAPS",   zone:"apigne",     pace:"marche",  xp:7100,  img:"https://i.pravatar.cc/150?img=45", online:false, lastSeen:"Il y a 1h",    color:"#fb7185", bio:"STAPS debutante. Marche + running.", avails:["matin","weekend"] },
    { id:19, name:"Alexis Morin",        handle:"@alex_lifre",     grade:"L3 INFO",    zone:"lifre",      pace:"trail",   xp:6800,  img:"https://i.pravatar.cc/150?img=16", online:true,  lastSeen:"Il y a 20 min",color:"#7c3aed", bio:"Dev + traileur. Liffre.", avails:["weekend"] },
    { id:20, name:"Manon Blanc",         handle:"@manon_vert",     grade:"L2 Bio",     zone:"gayeulles",  pace:"footing", xp:6500,  img:"https://i.pravatar.cc/150?img=33", online:true,  lastSeen:"En cours",     color:"#c084fc", bio:"Bio & running. Gayeulles.", avails:["soir"] },
    { id:21, name:"Baptiste Simon",      handle:"@bap_campus",     grade:"M1 EPS",     zone:"beaulieu",   pace:"footing", xp:6200,  img:"https://i.pravatar.cc/150?img=21", online:false, lastSeen:"Il y a 2h",    color:"#38bdf8", bio:"EPS M1. Footing campus.", avails:["midi"] },
    { id:22, name:"Zoe Gauthier",        handle:"@zoe_thabor",     grade:"L1 STAPS",   zone:"thabor",     pace:"marche",  xp:5900,  img:"https://i.pravatar.cc/150?img=41", online:true,  lastSeen:"Il y a 12 min",color:"#fb923c", bio:"Marche escaliers du Thabor.", avails:["matin","soir"] },
    { id:23, name:"Tristan Dupuis",      handle:"@tris_rheu",      grade:"L3 EPS",     zone:"rheu",       pace:"footing", xp:5600,  img:"https://i.pravatar.cc/150?img=10", online:false, lastSeen:"Il y a 6h",    color:"#4ade80", bio:"Footing soir Bois du Rheu.", avails:["soir"] },
    { id:24, name:"Laura Perrin",        handle:"@laura_soeuvres", grade:"M2 STAPS",   zone:"soeuvres",   pace:"trail",   xp:5400,  img:"https://i.pravatar.cc/150?img=28", online:true,  lastSeen:"Il y a 5 min", color:"#f472b6", bio:"STAPS M2. Trail Soeuvres.", avails:["matin","soir"] },
    { id:25, name:"Quentin Blanc",       handle:"@quent_run",      grade:"L2 Droit",   zone:"stmartin",   pace:"footing", xp:5100,  img:"https://i.pravatar.cc/150?img=14", online:false, lastSeen:"Il y a 3h",    color:"#2dd4bf", bio:"Droit + footing St-Martin.", avails:["soir","weekend"] },
    { id:26, name:"Anais Fournier",      handle:"@anais_fleur",    grade:"L1 STAPS",   zone:"gayeulles",  pace:"marche",  xp:4800,  img:"https://i.pravatar.cc/150?img=29", online:false, lastSeen:"Il y a 2h",    color:"#a78bfa", bio:"Marche active Gayeulles.", avails:["matin","weekend"] },
    { id:27, name:"Arnaud Girard",       handle:"@arnaud_lifre",   grade:"L3 Bio",     zone:"lifre",      pace:"trail",   xp:4500,  img:"https://i.pravatar.cc/150?img=9",  online:true,  lastSeen:"Il y a 30 min",color:"#fbbf24", bio:"Bio & trail. Liffre profonde.", avails:["weekend"] },
    { id:28, name:"Pauline Leblanc",     handle:"@pau_apigne",     grade:"M1 STAPS",   zone:"apigne",     pace:"footing", xp:4200,  img:"https://i.pravatar.cc/150?img=30", online:false, lastSeen:"Il y a 4h",    color:"#60a5fa", bio:"STAPS M1. Footing Apigne.", avails:["matin"] },
    { id:29, name:"Kevin Masson",        handle:"@kev_campus",     grade:"L2 EPS",     zone:"beaulieu",   pace:"footing", xp:3900,  img:"https://i.pravatar.cc/150?img=8",  online:true,  lastSeen:"En cours",     color:"#34d399", bio:"EPS. Campus tous les midis.", avails:["midi"] },
    { id:30, name:"Julie Faure",         handle:"@julie_thabor",   grade:"L1 Bio",     zone:"thabor",     pace:"marche",  xp:3700,  img:"https://i.pravatar.cc/150?img=48", online:false, lastSeen:"Il y a 1h",    color:"#f87171", bio:"Marche matin Thabor.", avails:["matin"] },
    { id:31, name:"Vincent Rousseau",    handle:"@vinc_rheu",      grade:"L3 STAPS",   zone:"rheu",       pace:"trail",   xp:3500,  img:"https://i.pravatar.cc/150?img=7",  online:false, lastSeen:"Il y a 7h",    color:"#818cf8", bio:"Trail boise Rheu.", avails:["weekend"] },
    { id:32, name:"Oceane Roy",          handle:"@oce_stmartin",   grade:"M1 Kine",    zone:"stmartin",   pace:"footing", xp:3300,  img:"https://i.pravatar.cc/150?img=46", online:true,  lastSeen:"Il y a 18 min",color:"#67e8f9", bio:"Kine. Footing St-Martin.", avails:["soir"] },
    { id:33, name:"Sebastien Adam",      handle:"@seb_soeuvres",   grade:"L2 STAPS",   zone:"soeuvres",   pace:"trail",   xp:3100,  img:"https://i.pravatar.cc/150?img=6",  online:false, lastSeen:"Il y a 5h",    color:"#a3e635", bio:"Trail Soeuvres.", avails:["soir","weekend"] },
    { id:34, name:"Marion Muller",       handle:"@marion_gay",     grade:"L1 Geo",     zone:"gayeulles",  pace:"marche",  xp:2900,  img:"https://i.pravatar.cc/150?img=35", online:true,  lastSeen:"Il y a 22 min",color:"#e879f9", bio:"Geo L1. Marche Gayeulles.", avails:["matin"] },
    { id:35, name:"Alexandre Brunet",    handle:"@alex_campus",    grade:"L3 Maths",   zone:"beaulieu",   pace:"footing", xp:2700,  img:"https://i.pravatar.cc/150?img=3",  online:false, lastSeen:"Il y a 3h",    color:"#94a3b8", bio:"Maths L3. Campus run.", avails:["midi"] },
    { id:36, name:"Audrey Franck",       handle:"@aud_lifre",      grade:"M2 EPS",     zone:"lifre",      pace:"trail",   xp:2500,  img:"https://i.pravatar.cc/150?img=27", online:true,  lastSeen:"Il y a 35 min",color:"#fb7185", bio:"EPS M2. Ultra trail Liffre.", avails:["weekend"] },
    { id:37, name:"Maxime Schmitt",      handle:"@max_apigne",     grade:"L2 INFO",    zone:"apigne",     pace:"footing", xp:2300,  img:"https://i.pravatar.cc/150?img=4",  online:false, lastSeen:"Il y a 6h",    color:"#7dd3fc", bio:"Dev. Footing Apigne.", avails:["soir"] },
    { id:38, name:"Caroline Bertrand",   handle:"@caro_thabor",    grade:"L1 STAPS",   zone:"thabor",     pace:"marche",  xp:2100,  img:"https://i.pravatar.cc/150?img=26", online:true,  lastSeen:"Il y a 14 min",color:"#f9a8d4", bio:"STAPS. Marche Thabor.", avails:["matin","soir"] },
    { id:39, name:"Francois Leclerc",    handle:"@fran_rheu",      grade:"L3 Droit",   zone:"rheu",       pace:"footing", xp:1900,  img:"https://i.pravatar.cc/150?img=2",  online:false, lastSeen:"Il y a 8h",    color:"#5eead4", bio:"Footing Bois du Rheu.", avails:["soir"] },
    { id:40, name:"Stephanie Colin",     handle:"@steph_stmar",    grade:"M1 Bio",     zone:"stmartin",   pace:"marche",  xp:1800,  img:"https://i.pravatar.cc/150?img=43", online:false, lastSeen:"Il y a 2h",    color:"#fcd34d", bio:"Bio M1. Marche St-Martin.", avails:["matin"] },
    { id:41, name:"Guillaume Lambert",   handle:"@guil_gay",       grade:"L2 EPS",     zone:"gayeulles",  pace:"footing", xp:1600,  img:"https://i.pravatar.cc/150?img=23", online:true,  lastSeen:"Il y a 28 min",color:"#86efac", bio:"EPS L2. Gayeulles.", avails:["soir"] },
    { id:42, name:"Nathalie Guerin",     handle:"@nat_soeuvres",   grade:"L1 STAPS",   zone:"soeuvres",   pace:"marche",  xp:1500,  img:"https://i.pravatar.cc/150?img=31", online:false, lastSeen:"Il y a 4h",    color:"#c4b5fd", bio:"Marche Soeuvres.", avails:["matin","weekend"] },
    { id:43, name:"Laurent Morel",       handle:"@lau_lifre",      grade:"M2 Kine",    zone:"lifre",      pace:"trail",   xp:1400,  img:"https://i.pravatar.cc/150?img=24", online:true,  lastSeen:"Il y a 40 min",color:"#93c5fd", bio:"Kine M2. Trail longue.", avails:["weekend"] },
    { id:44, name:"Anne-Sophie Torres",  handle:"@anne_apigne",    grade:"L3 STAPS",   zone:"apigne",     pace:"footing", xp:1300,  img:"https://i.pravatar.cc/150?img=42", online:false, lastSeen:"Il y a 3h",    color:"#fda4af", bio:"STAPS. Footing Apigne.", avails:["matin"] },
    { id:45, name:"Pierre Roux",         handle:"@pierre_campus",  grade:"L2 Bio",     zone:"beaulieu",   pace:"marche",  xp:1200,  img:"https://i.pravatar.cc/150?img=1",  online:false, lastSeen:"Il y a 5h",    color:"#6ee7b7", bio:"Bio. Marche campus.", avails:["midi"] },
    { id:46, name:"Emilie Gonzalez",     handle:"@emi_thabor",     grade:"L1 STAPS",   zone:"thabor",     pace:"footing", xp:1100,  img:"https://i.pravatar.cc/150?img=37", online:true,  lastSeen:"Il y a 20 min",color:"#fdba74", bio:"STAPS. Footing Thabor.", avails:["soir"] },
    { id:47, name:"Benoit Christophe",   handle:"@ben_rheu",       grade:"L3 INFO",    zone:"rheu",       pace:"footing", xp:1000,  img:"https://i.pravatar.cc/150?img=5",  online:false, lastSeen:"Il y a 9h",    color:"#d8b4fe", bio:"Dev. Footing Rheu.", avails:["soir"] },
    { id:48, name:"Jennifer Clement",    handle:"@jen_stmar",      grade:"M1 STAPS",   zone:"stmartin",   pace:"trail",   xp:900,   img:"https://i.pravatar.cc/150?img=34", online:false, lastSeen:"Il y a 2h",    color:"#99f6e4", bio:"STAPS M1. Trail St-Martin.", avails:["weekend"] },
    { id:49, name:"Julien Potier",       handle:"@jul_gay",        grade:"L2 EPS",     zone:"gayeulles",  pace:"footing", xp:800,   img:"https://i.pravatar.cc/150?img=55", online:true,  lastSeen:"En cours",     color:"#cbd5e1", bio:"EPS. Footing Gayeulles.", avails:["soir"] },
    { id:50, name:"Marie-Claire Oger",   handle:"@mc_beauregard",  grade:"L1 Geo",     zone:"beauregard", pace:"marche",  xp:650,   img:"https://i.pravatar.cc/150?img=56", online:true,  lastSeen:"En cours",     color:"#a7f3d0", bio:"Marche Beauregard.", avails:["matin","weekend"] },
    { id:51, name:"Thibaut Renard",      handle:"@thib_breg",      grade:"M1 INFO",    zone:"beauregard", pace:"footing", xp:500,   img:"https://i.pravatar.cc/150?img=57", online:false, lastSeen:"Il y a 1h",    color:"#fef08a", bio:"Dev M1. Footing Beauregard.", avails:["midi","soir"] },
    { id:52, name:"Nadege Collin",       handle:"@nad_soeuvres",   grade:"L2 Maths",   zone:"soeuvres",   pace:"marche",  xp:320,   img:"https://i.pravatar.cc/150?img=58", online:false, lastSeen:"Il y a 6h",    color:"#fca5a5", bio:"Maths L2. Debutante running.", avails:["weekend"] },
  ],

  venues: [
    { name: "Roazhon Park", type: "stadium", lat: 48.1078, lng: -1.7142, address: "111 Route de Lorient, Rennes" },
    { name: "Piscine de Bréquigny", type: "pool", lat: 48.0985, lng: -1.6991, address: "Bd Georges Pompidou, Rennes" },
    { name: "Gymnase Courtemanche", type: "gym", lat: 48.1212, lng: -1.6923, address: "Rue de Courtemanche, Rennes" },
    { name: "Stade de Courtemanche", type: "stadium", lat: 48.1198, lng: -1.6945, address: "Rennes" },
    { name: "Piscine Saint-George", type: "pool", lat: 48.1135, lng: -1.6758, address: "2 Rue Gambetta, Rennes" },
    { name: "Gymnase Kennedy", type: "gym", lat: 48.1082, lng: -1.6812, address: "Av. du Président Kennedy, Rennes" },
    { name: "Vélodrome Communal", type: "bike", lat: 48.1342, lng: -1.6478, address: "Les Gayeulles, Rennes" },
    { name: "Tennis Parc des Sports", type: "tennis", lat: 48.1098, lng: -1.6935, address: "Parc des Sports, Rennes" },
    { name: "Stade Municipal", type: "stadium", lat: 48.1055, lng: -1.7012, address: "Rue Henri Fréville, Rennes" },
    { name: "Gymnase de Beaulieu", type: "gym", lat: 48.1195, lng: -1.6372, address: "Campus de Beaulieu, Rennes" },
  ],

  clubs: [
    { id:"c001", name:"Trail du Thabor - depart 18h", zone:"thabor",     activity:"footing", time:"18:00", maxParticipants:8,  participants:[1,2,7,22],    status:"soon", organizer:2, createdAt:Date.now()-1800000,   desc:"Footing en groupe autour du Thabor. Niveau intermediaire. Depart escaliers est.", coords:[48.114,-1.666] },
    { id:"c002", name:"Run Gayeulles - on a besoin de vous !", zone:"gayeulles", activity:"trail",   time:"17:30", maxParticipants:6,  participants:[1,6,20],      status:"live", organizer:6, createdAt:Date.now()-3600000,   desc:"Trail technique au coeur du Gayeulles. Traileurs confirmes recherches.", coords:[48.136,-1.642] },
    { id:"c003", name:"Marche nordique Apigne",         zone:"apigne",     activity:"marche",  time:"09:00", maxParticipants:12, participants:[4,12,18,30,44], status:"soon", organizer:4, createdAt:Date.now()-2700000,   desc:"Marche nordique autour des etangs. Accessible PMR.", coords:[48.098,-1.735] },
    { id:"c004", name:"Fractionne Campus Beaulieu",     zone:"beaulieu",   activity:"footing", time:"12:30", maxParticipants:5,  participants:[5,29],          status:"live", organizer:5, createdAt:Date.now()-1200000,   desc:"Fractionne sur piste campus. 8x400m. Niveau intermediaire.", coords:[48.118,-1.637] },
    { id:"c005", name:"Exploration Liffre - samedi",    zone:"lifre",      activity:"trail",   time:"08:00", maxParticipants:10, participants:[9,19,27,36,43], status:"soon", organizer:9, createdAt:Date.now()-7200000,   desc:"Grande sortie decouverte Liffre. 10km. Emporter eau. Confirme.", coords:[48.212,-1.512] },
  ],

  badges: [
    { id:"b01", icon:"\u{1F331}", name:"Premier pas",      desc:"Premiere session completee",        unlocked:true  },
    { id:"b02", icon:"\u{1F332}", name:"Foret Rennaise",   desc:"5 parcs differents visites",         unlocked:true  },
    { id:"b03", icon:"\u{1F465}", name:"Social Runner",    desc:"Premier Poc envoye",                unlocked:true  },
    { id:"b04", icon:"\u{1F525}", name:"Serie de 7",       desc:"7 jours consecutifs actif",         unlocked:true  },
    { id:"b05", icon:"\u{2B50}",  name:"50km cumules",     desc:"50km parcourus au total",            unlocked:false },
    { id:"b06", icon:"\u{1F3C6}", name:"Club Fondateur",   desc:"Cree votre premier club",           unlocked:false },
    { id:"b07", icon:"\u{1F4A7}", name:"Hydrate",          desc:"3 points d'eau trouves",             unlocked:false },
    { id:"b08", icon:"\u{1F319}", name:"Nocturne",         desc:"Session apres 20h",                  unlocked:false },
    { id:"b09", icon:"\u{1F98A}", name:"Explorateur",      desc:"19 parcours completes",             unlocked:false },
    { id:"b10", icon:"\u{1F91D}", name:"Bonne rencontre",  desc:"3 clubs rejoints",                   unlocked:false },
    { id:"b11", icon:"\u{1F4CD}", name:"Cartographe",      desc:"Tous les parcs visites",             unlocked:false },
    { id:"b12", icon:"\u{26A1}",  name:"Vitesse",          desc:"PB sur un parcours",                unlocked:false },
    { id:"b13", icon:"\u{1F327}", name:"Tout-terrain",     desc:"Session sous la pluie",             unlocked:false },
    { id:"b14", icon:"\u{1F3AF}", name:"Precis",           desc:"10 seances meme endroit",            unlocked:false },
    { id:"b15", icon:"\u{1F98B}", name:"Papillon social",  desc:"10 amis ajoutes",                   unlocked:false },
    { id:"b16", icon:"\u{1F3C5}", name:"100km",            desc:"100km parcourus au total",           unlocked:false },
  ],
};

// =============================================================================
// MODULE 2 — STORE
// =============================================================================
const Store = {
  _data: null,
  _defaults: {
    onboardingDone: false,
    myProfile: { name:"Flavien G.", handle:"@flavien", zone:"beauregard", pace:"footing", avails:["midi","soir"], xp:1240, level:3, km:34.2, sessions:12, friends:7, streak:4, rank:18, img:"https://ui-avatars.com/api/?name=Flavien+G&background=2D6A4F&color=fff&bold=true&size=200" },
    settings: { anonymous:false, shareGeo:true, accessibility:false },
    pocsSent: [],
  },
  get data() {
    if (!this._data) {
      try { const s = localStorage.getItem("foretmoov_v2"); this._data = s ? {...this._defaults,...JSON.parse(s)} : {...this._defaults}; }
      catch { this._data = {...this._defaults}; }
    }
    return this._data;
  },
  save() { try { localStorage.setItem("foretmoov_v2", JSON.stringify(this._data)); } catch {} },
  update(path, value) {
    const keys = path.split(".");
    let obj = this.data;
    for (let i = 0; i < keys.length - 1; i++) { if (!obj[keys[i]]) obj[keys[i]] = {}; obj = obj[keys[i]]; }
    obj[keys[keys.length - 1]] = value;
    this.save();
  },
  addXP(amount, reason) {
    this.data.myProfile.xp = (this.data.myProfile.xp || 0) + amount;
    this.save();
    Toast.show("XP gagne !", `+${amount} XP${reason ? " — " + reason : ""}`, "green", "seedling");
  },
};

// =============================================================================
// MODULE 3 — TOAST
// =============================================================================
const Toast = {
  _t: null,
  show(title, msg, type="green", icon="leaf") {
    const el = document.getElementById("toast-island");
    if (!el) return;
    document.getElementById("toast-icon").className = `toast-icon toast-icon-${type}`;
    document.getElementById("toast-icon-i").className = `fas fa-${icon}`;
    document.getElementById("toast-title").textContent = title;
    document.getElementById("toast-msg").textContent = msg;
    el.classList.add("show");
    clearTimeout(this._t);
    this._t = setTimeout(() => el.classList.remove("show"), 3200);
  }
};

// =============================================================================
// MODULE 4 — ONBOARDING
// =============================================================================
const Onboarding = {
  _slide: 0,
  init() {
    if (Store.data.onboardingDone) { document.getElementById("onboarding-overlay").style.display = "none"; return; }
    document.getElementById("onboarding-overlay").classList.add("active");
  },
  next() {
    const slides = document.querySelectorAll(".onboarding-slide");
    slides[this._slide].classList.remove("active");
    this._slide++;
    if (this._slide < slides.length) slides[this._slide].classList.add("active");
  },
  finish() {
    const ov = document.getElementById("onboarding-overlay");
    ov.style.opacity = "0";
    setTimeout(() => { ov.style.display = "none"; }, 400);
    Store.update("onboardingDone", true);
    Toast.show("Bienvenue sur RennesMOOV !", "Trouvez vos partenaires de course a Rennes", "green", "leaf");
  }
};

// =============================================================================
// MODULE 5 — NAVIGATION
// =============================================================================
const App = {
  _current: "home",
  nav(view) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    const viewEl = document.getElementById(`view-${view}`);
    const navEl  = document.getElementById(`nav-${view}`);
    if (viewEl) viewEl.classList.add("active");
    if (navEl)  navEl.classList.add("active");
    this._current = view;
    if (view === "radar")   RadarMap.initFull();
    if (view === "explore") Explorer.render();
    if (view === "match")   Matching.render();
    if (view === "clubs")   { ClubSystem.initMap(); ClubSystem.render(); }
    if (view === "profile") ProfileView.render();
    const scroll = document.getElementById("main-scroll");
    if (scroll) scroll.scrollTo({ top:0, behavior:"smooth" });
  },
};

// =============================================================================
// MODULE 6 — MOCK API
// =============================================================================
const MockAPI = {
  _delay: (ms=400) => new Promise(r => setTimeout(r, ms + Math.random() * 200)),

  async fetchNearbyUsers(lat, lng, radius=2.5, filters={}) {
    await this._delay(350);
    let users = DB.users.filter(u => u.online);
    if (filters.pace && filters.pace !== "all") users = users.filter(u => u.pace === filters.pace);
    if (filters.zone && filters.zone !== "all") users = users.filter(u => u.zone === filters.zone);
    return { success:true, data:users, count:users.length, timestamp:Date.now() };
  },

  async fetchMatchingScore(myProfile, targetUser) {
    await this._delay(120);
    let score = 0;
    if (myProfile.pace === targetUser.pace) score += 40;
    else if ((myProfile.pace === "footing" && targetUser.pace === "trail") || (myProfile.pace === "trail" && targetUser.pace === "footing")) score += 22;
    if (myProfile.zone === targetUser.zone) score += 30;
    const sharedAvails = (myProfile.avails || []).filter(a => (targetUser.avails || []).includes(a));
    score += sharedAvails.length * 10;
    const xpRatio = Math.min(myProfile.xp || 1, targetUser.xp) / Math.max(myProfile.xp || 1, targetUser.xp);
    score += Math.round(xpRatio * 8);
    if (targetUser.online) score += 5;
    return { success:true, score:Math.min(Math.round(score), 100), sharedAvails };
  },

  async fetchWeather() {
    await this._delay(500);
    const conditions = [
      { temp:14, desc:"Nuageux",                icon:"cloud",            bonus:"+10% XP" },
      { temp:17, desc:"Partiellement ensoleille",icon:"cloud-sun",        bonus:"+15% XP" },
      { temp:12, desc:"Averses legeres",          icon:"cloud-drizzle",   bonus:"+20% XP" },
      { temp:19, desc:"Ensoleille",               icon:"sun",              bonus:"+25% XP" },
      { temp:9,  desc:"Vent fort",                icon:"wind",             bonus:"+30% XP" },
    ];
    return { success:true, data:conditions[Math.floor(Math.random() * conditions.length)] };
  },

  async joinClub(clubId, userId) {
    await this._delay(600);
    const club = DB.clubs.find(c => c.id === clubId);
    if (!club) return { success:false, error:"Club introuvable" };
    if (club.participants.length >= club.maxParticipants) return { success:false, error:"Club complet" };
    if (!club.participants.includes(userId)) club.participants.push(userId);
    return { success:true, data:club };
  },

  async sendPoc(fromId, toId) {
    await this._delay(300);
    return { success:true, pocId:`poc_${Date.now()}`, fromId, toId, timestamp:Date.now() };
  },

  async createClub(clubData) {
    await this._delay(700);
    const newClub = { ...clubData, id:`c${Date.now()}`, participants:[0], status:"soon", createdAt:Date.now() };
    DB.clubs.push(newClub);
    return { success:true, data:newClub };
  },
};

// =============================================================================
// MODULE 7 — RADAR MAP
// =============================================================================
const RadarMap = {
  _mapFull: null,
  _userMarkers: [],
  _clubMarkers: [],
  _moveInterval: null,
  _filterPace: "all",
  _filterZone: "all",

  _makeAvatarIcon(user) {
    const safeName = encodeURIComponent(user.name);
    const safeColor = (user.color || "#2D6A4F").replace("#","");
    return L.divIcon({
      className: "",
      html: `<div style="position:relative;width:38px;height:38px;">
        <div style="width:38px;height:38px;border-radius:50%;overflow:hidden;border:3px solid ${user.color || "#2D6A4F"};box-shadow:0 2px 10px rgba(0,0,0,0.2);cursor:pointer;background:#fff;">
          <img src="${user.img}" style="width:100%;height:100%;object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${safeName}&background=${safeColor}&color=fff&bold=true&size=50'">
        </div>
        ${user.online ? `<div style="position:absolute;bottom:1px;right:1px;width:11px;height:11px;background:#22C55E;border-radius:50%;border:2px solid white;"></div>` : ""}
      </div>`,
      iconSize: [38, 38], iconAnchor: [19, 19],
    });
  },

  _makeParkIcon(key) {
    const z = DB.zones[key];
    return L.divIcon({
      className: "",
      html: `<div style="display:flex;flex-direction:column;align-items:center;">
        <div style="width:14px;height:14px;background:${z.color};border-radius:50%;border:2.5px solid white;box-shadow:0 0 12px ${z.color}80;"></div>
        <div style="background:white;border-radius:6px;padding:2px 6px;font-size:9px;font-weight:700;color:${z.color};margin-top:2px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.12);border:1px solid ${z.color}40;">${z.icon} ${z.name.split(" ")[0]}</div>
      </div>`,
      iconSize: [80, 30], iconAnchor: [40, 14],
    });
  },

  _makeClubIcon(club) {
    const actIcon = {footing:"\u{1F3C3}",marche:"\u{1F6B6}",trail:"\u26F0"}[club.activity] || "\u{1F465}";
    return L.divIcon({
      className: "",
      html: `<div style="width:36px;height:36px;background:linear-gradient(135deg,#F4A261,#DD6B20);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid white;box-shadow:0 4px 12px rgba(244,162,97,0.5);display:flex;align-items:center;justify-content:center;">
        <span style="transform:rotate(45deg);font-size:16px;">${actIcon}</span>
      </div>`,
      iconSize: [36, 36], iconAnchor: [18, 36],
    });
  },

  _initBaseMap(containerId, options={}) {
    const container = document.getElementById(containerId);
    if (!container || typeof L === "undefined") return null;
    try {
      const map = L.map(containerId, {
        zoomControl:false, attributionControl:true,
        scrollWheelZoom: options.scroll !== false,
        dragging: options.drag !== false,
      }).setView([48.1172, -1.6777], options.zoom || 12);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains:"abcd", maxZoom:19, attribution:"(c) CartoDB",
      }).addTo(map);
      setTimeout(() => map.invalidateSize(), 300);
      setTimeout(() => map.invalidateSize(), 900);
      return map;
    } catch(e) { console.warn("Map init:", e); return null; }
  },

  initMini(containerId) {
    const map = this._initBaseMap(containerId, { zoom:12, scroll:false, drag:false });
    if (!map) return null;
    this._drawParks(map);
    DB.users.filter(u => u.online).slice(0, 10).forEach(u => {
      const z = DB.zones[u.zone];
      if (!z) return;
      const lat = z.coords[0] + (Math.random()-0.5)*0.015;
      const lng = z.coords[1] + (Math.random()-0.5)*0.015;
      L.marker([lat,lng], { icon:this._makeAvatarIcon(u) }).addTo(map);
    });
    return map;
  },

  initFull() {
    if (this._mapFull) { setTimeout(() => this._mapFull.invalidateSize(), 200); return; }
    this._mapFull = this._initBaseMap("radar-map", { zoom:13 });
    if (!this._mapFull) return;
    this._drawParks(this._mapFull);
    this._drawLiveUsers(this._mapFull);
    this._drawClubs(this._mapFull);
    this._startAnimation();
    this._renderNearby();
  },

  _drawParks(map) {
    Object.entries(DB.zones).forEach(([key, zone]) => {
      L.marker(zone.coords, { icon:this._makeParkIcon(key) }).addTo(map)
        .on("click", () => { App.nav("explore"); Toast.show(zone.name, `${DB.trails.filter(t=>t.zone===key).length} parcours`, "green", "map"); });
    });
  },

  _drawLiveUsers(map) {
    const online = DB.users.filter(u => {
      if (!u.online) return false;
      if (this._filterPace !== "all" && u.pace !== this._filterPace) return false;
      if (this._filterZone !== "all" && u.zone !== this._filterZone) return false;
      return true;
    });
    online.forEach(u => {
      const z = DB.zones[u.zone];
      if (!z) return;
      const lat = z.coords[0] + (Math.random()-0.5)*0.018;
      const lng = z.coords[1] + (Math.random()-0.5)*0.018;
      const marker = L.marker([lat,lng], { icon:this._makeAvatarIcon(u) }).addTo(map);
      marker.on("click", () => UserProfile.show(u));
      this._userMarkers.push({ marker, baseCoords:[lat,lng], speed:0.0001 + Math.random()*0.0002 });
    });
    const el = document.getElementById("radar-active-count");
    if (el) el.textContent = `${this._userMarkers.length} actifs`;
  },

  _drawClubs(map) {
    DB.clubs.forEach(club => {
      const m = L.marker(club.coords, { icon:this._makeClubIcon(club) }).addTo(map);
      m.on("click", () => ClubSystem.showDetail(club.id));
      this._clubMarkers.push(m);
    });
  },

  _startAnimation() {
    clearInterval(this._moveInterval);
    this._moveInterval = setInterval(() => {
      this._userMarkers.forEach(um => {
        const lat = um.baseCoords[0] + (Math.random()-0.5) * um.speed * 2;
        const lng = um.baseCoords[1] + (Math.random()-0.5) * um.speed * 2;
        um.marker.setLatLng([lat, lng]);
        um.baseCoords = [lat, lng];
      });
    }, 1800);
  },

  _renderNearby() {
    const container = document.getElementById("radar-nearby-list");
    if (!container) return;
    const online = DB.users.filter(u => u.online).slice(0, 10);
    container.innerHTML = online.map(u => {
      const safeName = encodeURIComponent(u.name);
      const safeColor = (u.color||"#2D6A4F").replace("#","");
      const paceEmoji = {footing:"\u{1F3C3}",marche:"\u{1F6B6}",trail:"\u26F0"}[u.pace] || "";
      return `<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;" onclick="UserProfile.show(DB.users.find(x=>x.id===${u.id}))">
        <div style="position:relative;">
          <img src="${u.img}" style="width:44px;height:44px;border-radius:50%;border:2.5px solid ${u.color};object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${safeName}&background=${safeColor}&color=fff&bold=true&size=50'">
          <div style="position:absolute;bottom:0;right:0;width:10px;height:10px;background:#22C55E;border-radius:50%;border:2px solid white;"></div>
        </div>
        <span style="font-size:9px;font-weight:700;color:var(--gray-700);white-space:nowrap;max-width:50px;overflow:hidden;text-overflow:ellipsis;">${u.name.split(" ")[0]}</span>
        <span style="font-size:10px;">${paceEmoji}</span>
      </div>`;
    }).join("");
  },

  _refreshLiveMarkers() {
    if (!this._mapFull) return;
    this._userMarkers.forEach(um => this._mapFull.removeLayer(um.marker));
    this._userMarkers = [];
    clearInterval(this._moveInterval);
    this._drawLiveUsers(this._mapFull);
    this._startAnimation();
    this._renderNearby();
  },

  filterByPace(pace, el) {
    document.querySelectorAll("#filter-pace-bar .chip").forEach(c => c.className = "chip chip-default");
    if (el) el.className = "chip chip-active";
    this._filterPace = pace;
    this._refreshLiveMarkers();
  },

  filterByZone(zone, el) {
    document.querySelectorAll("#filter-zone-bar .chip").forEach(c => c.className = "chip chip-default");
    if (el) el.className = "chip chip-active";
    this._filterZone = zone;
    this._refreshLiveMarkers();
  },

  toggleFilterPanel() {
    const p = document.getElementById("radar-filter-panel");
    if (p) p.style.display = p.style.display === "none" ? "block" : "none";
  },

  centerView() {
    if (this._mapFull) this._mapFull.setView([48.1172, -1.6777], 13, { animate:true });
  },
};

// =============================================================================
// MODULE 8 — EXPLORER
// =============================================================================
const Explorer = {
  _paceFilter: "all",
  _amenityFilters: new Set(),
  _searchQuery: "",

  render() { this._renderResults(); },

  _getFiltered() {
    return DB.trails.filter(t => {
      if (this._paceFilter !== "all" && t.pace !== this._paceFilter) return false;
      if (this._amenityFilters.has("eau") && !t.eau) return false;
      if (this._amenityFilters.has("ombre") && t.ombre < 60) return false;
      if (this._amenityFilters.has("accessible") && !t.accessible) return false;
      if (this._amenityFilters.has("court") && t.duration > 30) return false;
      if (this._searchQuery) {
        const q = this._searchQuery.toLowerCase();
        return t.title.toLowerCase().includes(q) || DB.zones[t.zone]?.name.toLowerCase().includes(q);
      }
      return true;
    });
  },

  _renderResults() {
    const container = document.getElementById("explore-results");
    if (!container) return;
    const trails = this._getFiltered();
    if (!trails.length) {
      container.innerHTML = `<div style="text-align:center;padding:48px 0;color:var(--gray-400);"><div style="font-size:40px;margin-bottom:10px;">\u{1F33F}</div><div style="font-weight:700;color:var(--gray-600);">Aucun parcours</div><div style="font-size:13px;margin-top:4px;">Modifiez vos filtres</div></div>`;
      return;
    }
    container.innerHTML = trails.map(t => this._trailCardHTML(t)).join("");
  },

  _trailCardHTML(t) {
    const zone = DB.zones[t.zone];
    const lvlColor = {debutant:"#22C55E",intermediaire:"#F59E0B",confirme:"#F97316",expert:"#EF4444"}[t.level] || "#9CA3AF";
    const paceLabel = {marche:"\u{1F6B6} Marche",footing:"\u{1F3C3} Footing",trail:"\u26F0 Trail"}[t.pace];
    return `
      <div class="trail-card card-interactive" onclick="TrailDetail.show('${t.id}')">
        <div class="trail-card-img-wrap">
          <img src="${t.img}" alt="${t.title}" loading="lazy">
          <div class="trail-card-img-overlay"></div>
          <div style="position:absolute;top:10px;left:10px;display:flex;gap:6px;">
            <span style="background:${lvlColor};color:white;border-radius:99px;padding:3px 10px;font-size:10px;font-weight:700;">${t.level.charAt(0).toUpperCase()+t.level.slice(1)}</span>
            <span style="background:rgba(0,0,0,0.55);color:white;border-radius:99px;padding:3px 10px;font-size:10px;font-weight:700;">${paceLabel}</span>
          </div>
          ${t.usersNow > 0 ? `<div style="position:absolute;top:10px;right:10px;background:rgba(34,197,94,0.9);color:white;border-radius:99px;padding:3px 10px;font-size:10px;font-weight:800;">\u{1F7E2} ${t.usersNow} actifs</div>` : ""}
        </div>
        <div class="trail-card-body">
          <div style="font-size:11px;font-weight:700;color:var(--forest-600);margin-bottom:4px;">${zone?.icon || ""} ${zone?.name || t.zone}</div>
          <div class="trail-card-title">${t.title}</div>
          <div class="trail-card-stats">
            <div class="trail-stat"><i class="fas fa-clock"></i> ${t.duration} min</div>
            <div class="trail-stat"><i class="fas fa-route"></i> ${t.distance} km</div>
            <div class="trail-stat"><i class="fas fa-mountain"></i> +${t.elevation}m</div>
            <div class="trail-stat"><i class="fas fa-fire"></i> ${t.kcal} kcal</div>
          </div>
        </div>
        <div class="trail-card-footer">
          <div class="flex gap-3">
            ${t.eau ? `<div class="trail-amenity"><i class="fas fa-tint"></i> Eau</div>` : ""}
            ${t.ombre >= 60 ? `<div class="trail-amenity"><i class="fas fa-cloud"></i> ${t.ombre}% ombrage</div>` : ""}
            ${t.accessible ? `<div class="trail-amenity"><i class="fas fa-wheelchair"></i> PMR</div>` : ""}
          </div>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();TrailDetail.show('${t.id}')">Voir <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>`;
  },

  setPaceFilter(pace, el) {
    document.querySelectorAll("#explore-pace-filter .chip").forEach(c => c.className = "chip chip-default");
    if (el) el.className = "chip chip-active";
    this._paceFilter = pace;
    this._renderResults();
  },

  toggleAmenityFilter(filter, el) {
    if (this._amenityFilters.has(filter)) { this._amenityFilters.delete(filter); if (el) el.className = "chip chip-default"; }
    else { this._amenityFilters.add(filter); if (el) el.className = "chip chip-active"; }
    this._renderResults();
  },

  search(query) { this._searchQuery = query; this._renderResults(); },
};

// =============================================================================
// MODULE 9 — TRAIL DETAIL
// =============================================================================
const TrailDetail = {
  show(id) {
    const t = DB.trails.find(x => x.id === id);
    if (!t) return;
    const zone = DB.zones[t.zone];
    const lvlColor = {debutant:"#22C55E",intermediaire:"#F59E0B",confirme:"#F97316",expert:"#EF4444"}[t.level] || "#9CA3AF";
    const wpHTML = (t.waypoints||[]).map((wp, i) => `
      <div style="display:flex;gap:12px;padding:12px 0;${i?'border-top:1px solid var(--forest-100);':''}">
        <div style="width:28px;height:28px;background:var(--forest-700);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;">${i+1}</div>
        <div>
          <div style="font-size:13px;font-weight:800;color:var(--gray-900);margin-bottom:2px;">${wp.title}</div>
          <div style="font-size:12px;color:var(--gray-600);line-height:1.5;">${wp.desc}</div>
          ${wp.lat ? `<div style="font-size:10px;color:var(--gray-400);margin-top:2px;font-family:monospace;">${wp.lat.toFixed(4)}, ${wp.lng.toFixed(4)}</div>` : ""}
        </div>
      </div>`).join("");

    document.getElementById("modal-trail-content").innerHTML = `
      <div style="position:relative;height:200px;border-radius:16px;overflow:hidden;margin-bottom:16px;">
        <img src="${t.img}" style="width:100%;height:100%;object-fit:cover;">
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.6),transparent 60%);"></div>
        <div style="position:absolute;bottom:14px;left:14px;">
          <div style="font-size:11px;color:rgba(255,255,255,0.8);font-weight:700;margin-bottom:2px;">${zone?.icon} ${zone?.name}</div>
          <div style="font-size:20px;font-weight:900;color:white;">${t.title}</div>
        </div>
        <div style="position:absolute;top:12px;left:12px;background:${lvlColor};color:white;border-radius:99px;padding:4px 10px;font-size:11px;font-weight:700;">${t.level}</div>
      </div>
      <p style="font-size:13px;color:var(--gray-600);line-height:1.6;margin-bottom:16px;">${t.desc}</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
        ${[{v:t.duration+" min",l:"Duree"},{v:t.distance+" km",l:"Distance"},{v:"+"+t.elevation+"m",l:"Denivele"},{v:t.kcal+" kcal",l:"Calories"}].map(s=>`
          <div style="background:var(--forest-50);border-radius:12px;padding:10px;text-align:center;border:1px solid var(--forest-100);">
            <div style="font-size:15px;font-weight:900;color:var(--forest-800);">${s.v}</div>
            <div style="font-size:10px;color:var(--gray-500);font-weight:600;margin-top:2px;">${s.l}</div>
          </div>`).join("")}
      </div>
      ${wpHTML ? `<div style="font-size:14px;font-weight:800;color:var(--gray-900);margin-bottom:8px;">Points de passage</div><div style="margin-bottom:20px;">${wpHTML}</div>` : ""}
      <div style="display:flex;gap:10px;">
        <button class="btn btn-primary btn-lg" style="flex:1;" onclick="Modal.closeAll();Store.addXP(50,'Session lancee');Toast.show('Bonne seance !','Profitez du ${t.title}','green','leaf')"><i class="fas fa-play"></i> Lancer</button>
        <button class="btn btn-ghost btn-md" onclick="Modal.closeAll()"><i class="fas fa-times"></i></button>
      </div>`;
    Modal.open("trail-detail");
  },
};

// =============================================================================
// MODULE 10 — USER PROFILE
// =============================================================================
const UserProfile = {
  async show(user) {
    if (!user) return;
    const myProfile = Store.data.myProfile;
    const result = await MockAPI.fetchMatchingScore(myProfile, user);
    const score = result.score;
    const scoreColor = score >= 70 ? "#22C55E" : score >= 45 ? "#F59E0B" : "#9CA3AF";
    const paceEmoji = {footing:"\u{1F3C3}",marche:"\u{1F6B6}",trail:"\u26F0"}[user.pace] || "\u{1F3C3}";
    const safeName = encodeURIComponent(user.name);
    const safeColor = (user.color||"#2D6A4F").replace("#","");

    const pocSent = Store.data.pocsSent && Store.data.pocsSent.some(p => p.toId === user.id);
    const invited = Store.data.invitedUsers && Store.data.invitedUsers.includes(user.id);
    document.getElementById("modal-poc-content").innerHTML = `
      <div style="text-align:center;margin-bottom:20px;">
        <div style="position:relative;display:inline-block;margin-bottom:12px;">
          <img src="${user.img}" style="width:80px;height:80px;border-radius:50%;border:3px solid ${user.color};object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${safeName}&background=${safeColor}&color=fff&bold=true&size=150'">
          ${user.online ? `<div style="position:absolute;bottom:2px;right:2px;width:16px;height:16px;background:#22C55E;border-radius:50%;border:3px solid white;"></div>` : ""}
        </div>
        <div style="font-size:20px;font-weight:900;color:var(--gray-900);">${user.name}</div>
        <div style="font-size:13px;color:var(--gray-500);margin-top:2px;">${user.handle} · ${user.grade}</div>
        <div style="font-size:12px;color:${user.online?"#22C55E":"var(--gray-400)"};font-weight:700;margin-top:4px;">${user.online ? "\u{1F7E2} En ligne" : user.lastSeen}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;">
        <div style="background:var(--forest-50);border-radius:12px;padding:10px;text-align:center;border:1px solid var(--forest-100);">
          <div style="font-size:16px;font-weight:900;color:var(--forest-800);">${paceEmoji} ${user.pace}</div>
          <div style="font-size:10px;color:var(--gray-500);font-weight:600;margin-top:2px;">Allure</div>
        </div>
        <div style="background:var(--forest-50);border-radius:12px;padding:10px;text-align:center;border:1px solid var(--forest-100);">
          <div style="font-size:13px;font-weight:800;color:var(--forest-800);">${DB.zones[user.zone]?.icon||""} ${user.zone}</div>
          <div style="font-size:10px;color:var(--gray-500);font-weight:600;margin-top:2px;">Zone</div>
        </div>
        <div style="background:${scoreColor}18;border-radius:12px;padding:10px;text-align:center;border:1px solid ${scoreColor}30;">
          <div style="font-size:18px;font-weight:900;color:${scoreColor};">${score}%</div>
          <div style="font-size:10px;color:var(--gray-500);font-weight:600;margin-top:2px;">Match</div>
        </div>
      </div>
      <div style="background:var(--gray-50);border-radius:12px;padding:12px;margin-bottom:16px;border:1px solid var(--gray-200);">
        <div style="font-size:12px;color:var(--gray-700);line-height:1.6;">"${user.bio}"</div>
      </div>
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:6px;">Disponibilites</div>
        <div style="display:flex;gap:6px;">${(user.avails||[]).map(a=>`<span style="background:var(--forest-100);color:var(--forest-800);border:1px solid var(--forest-200);border-radius:99px;padding:3px 10px;font-size:11px;font-weight:700;">${a}</span>`).join("")}</div>
      </div>
      <div style="display:flex;gap:10px;">
        ${pocSent
          ?`<button class="btn btn-sent btn-lg" style="flex:1;cursor:default;"><i class="fas fa-check"></i> Poc envoyé</button>`
          :`<button class="btn btn-primary btn-lg" style="flex:1;" id="poc-send-btn-${user.id}" onclick="PocSystem.send(${user.id})"><i class="fas fa-paper-plane"></i> Poc</button>`}
        ${invited
          ?`<button class="btn btn-sent btn-md" disabled>&#10003; Invité</button>`
          :`<button class="btn btn-energy btn-md" id="invite-btn-${user.id}" onclick="ClubSystem.inviteToUser(${user.id}, this)"><i class="fas fa-users"></i> Inviter</button>`}
      </div>`;
    Modal.open("poc");
  },
};

// =============================================================================
// MODULE 11 — POC SYSTEM
// =============================================================================
const PocSystem = {
  async send(userId) {
    const user = DB.users.find(u => u.id === userId);
    if (!user) return;
    Modal.closeAll();
    const result = await MockAPI.sendPoc(0, userId);
    if (result.success) {
      Store.data.pocsSent.push(result);
      Store.save();
      Store.addXP(10, "Poc envoye");
      Toast.show(`Poc envoye a ${user.name.split(" ")[0]} !`, "Il/elle vous repondra bientot", "green", "paper-plane");
    }
  },
};

// =============================================================================
// MODULE 12 — MATCHING
// =============================================================================
const Matching = {
  _myPace: "footing",
  _myZone: "beauregard",
  _myAvails: ["midi","soir"],
  _scores: new Map(),

  async render() {
    const container = document.getElementById("match-list");
    if (container) container.innerHTML = `<div style="text-align:center;padding:32px;color:var(--gray-400);font-weight:600;">Calcul des scores...</div>`;
    await this._computeScores();
    this._renderList();
  },

  async _computeScores() {
    const myProfile = { ...Store.data.myProfile, pace:this._myPace, zone:this._myZone, avails:this._myAvails };
    await Promise.all(DB.users.map(async u => {
      const r = await MockAPI.fetchMatchingScore(myProfile, u);
      this._scores.set(u.id, r.score);
    }));
  },

  _renderList() {
    const container = document.getElementById("match-list");
    if (!container) return;
    const sorted = [...DB.users].map(u => ({...u, score:this._scores.get(u.id)||0})).sort((a,b)=>b.score-a.score).slice(0,15);
    const online = sorted.filter(u=>u.online).length;
    const sameZone = sorted.filter(u=>u.zone===this._myZone).length;
    const setBadge = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
    setBadge("match-count", sorted.length);
    setBadge("match-online-count", online);
    setBadge("match-zone-count", sameZone);
    const badge = document.getElementById("match-badge");
    if (badge) badge.textContent = Math.min(online, 9);
    container.innerHTML = sorted.map(u => this._matchCardHTML(u)).join("");
  },

  _matchCardHTML(u) {
    const score = u.score;
    const sc = score >= 70 ? "#22C55E" : score >= 45 ? "#F59E0B" : "#9CA3AF";
    const paceEmoji = {footing:"\u{1F3C3}",marche:"\u{1F6B6}",trail:"\u26F0"}[u.pace]||"\u{1F3C3}";
    const safeName = encodeURIComponent(u.name);
    const safeColor = (u.color||"#2D6A4F").replace("#","");
    const r = 20; const circ = 2*Math.PI*r;
    return `
      <div class="match-card" onclick="UserProfile.show(DB.users.find(x=>x.id===${u.id}))">
        <img src="${u.img}" style="width:46px;height:46px;border-radius:50%;border:2.5px solid ${u.color};flex-shrink:0;object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${safeName}&background=${safeColor}&color=fff&bold=true&size=50'">
        <div class="match-info">
          <div class="match-name">${u.name}</div>
          <div class="match-meta">${paceEmoji} ${u.pace} · ${DB.zones[u.zone]?.icon||""} ${u.zone} · ${u.online?'<span style="color:#22C55E;font-weight:700;">En ligne</span>':u.lastSeen}</div>
          <div style="display:flex;gap:4px;margin-top:5px;">${(u.avails||[]).filter(a=>this._myAvails.includes(a)).map(a=>`<span style="background:var(--forest-100);color:var(--forest-700);border:1px solid var(--forest-200);border-radius:99px;padding:2px 7px;font-size:10px;font-weight:700;">\u2713 ${a}</span>`).join("")}</div>
        </div>
        <div style="position:relative;width:48px;height:48px;flex-shrink:0;">
          <svg viewBox="0 0 48 48" style="width:48px;height:48px;transform:rotate(-90deg);">
            <circle cx="24" cy="24" r="${r}" fill="none" stroke="var(--gray-200)" stroke-width="4"/>
            <circle cx="24" cy="24" r="${r}" fill="none" stroke="${sc}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ*(1-score/100)}"/>
          </svg>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:${sc};">${score}%</div>
        </div>
      </div>`;
  },

  setMyPace(pace, el) {
    document.querySelectorAll("#my-pace-selector .chip").forEach(c => c.className = "chip chip-sm chip-default");
    if (el) el.className = "chip chip-sm chip-active";
    this._myPace = pace; this.render();
  },
  setMyZone(zone) { this._myZone = zone; this.render(); },
  toggleAvail(avail, el) {
    const idx = this._myAvails.indexOf(avail);
    if (idx >= 0) { this._myAvails.splice(idx,1); if(el) el.className="chip chip-default"; }
    else { this._myAvails.push(avail); if(el) el.className="chip chip-active"; }
    this.render();
  },
  refresh() { Toast.show("Actualisation", "Recalcul en cours...", "green", "sync-alt"); this.render(); },
};

// =============================================================================
// MODULE 13 — CLUBS
// =============================================================================
const ClubSystem = {
  _activity: "footing",
  _filter: "all",
  _clubsMap: null,

  initMap() {
    if (this._clubsMap) { setTimeout(() => this._clubsMap.invalidateSize(), 200); return; }
    this._clubsMap = RadarMap._initBaseMap("clubs-map", { zoom:12, scroll:false, drag:false });
    if (!this._clubsMap) return;
    RadarMap._drawParks(this._clubsMap);
    DB.clubs.forEach(c => {
      L.marker(c.coords, { icon:RadarMap._makeClubIcon(c) }).addTo(this._clubsMap)
        .on("click", () => this.showDetail(c.id));
    });
    const el = document.getElementById("clubs-map-count");
    if (el) el.textContent = `${DB.clubs.length} clubs`;
  },

  render(filter=this._filter) {
    this._filter = filter;
    const container = document.getElementById("clubs-list");
    if (!container) return;
    const filtered = DB.clubs.filter(c => {
      if (filter === "all") return true;
      if (filter === "live") return c.status === "live";
      if (filter === "soon") return c.status === "soon";
      return c.activity === filter;
    });
    container.innerHTML = filtered.map(c => this._clubCardHTML(c)).join("");
    this._renderHomeClubs();
  },

  _renderHomeClubs() {
    const container = document.getElementById("home-clubs-list");
    if (!container) return;
    container.innerHTML = DB.clubs.slice(0,3).map(c => this._clubCardHTML(c)).join("");
  },

  _clubCardHTML(club) {
    const zone = DB.zones[club.zone];
    const actEmoji = {footing:"\u{1F3C3}",marche:"\u{1F6B6}",trail:"\u26F0"}[club.activity]||"\u{1F465}";
    const statusBg = club.status==="live" ? "#DCFCE7" : "#FEF3C7";
    const statusColor = club.status==="live" ? "#166534" : "#92400E";
    const remaining = club.maxParticipants - club.participants.length;
    const created = Math.floor((Date.now()-club.createdAt)/60000);
    const timeLabel = created < 60 ? created+"min" : Math.floor(created/60)+"h";
    return `
      <div class="club-card" onclick="ClubSystem.showDetail('${club.id}')">
        <div class="club-card-header">
          <div class="club-card-icon">${actEmoji}</div>
          <div style="flex:1;min-width:0;">
            <div class="club-card-title">${club.name}</div>
            <div class="club-card-meta">${zone?.icon||""} ${zone?.name||club.zone} · il y a ${timeLabel}</div>
          </div>
          <span style="background:${statusBg};color:${statusColor};border-radius:99px;padding:3px 10px;font-size:10px;font-weight:800;white-space:nowrap;">${club.status==="live"?"En cours":"Bientot"}</span>
        </div>
        <p style="font-size:12px;color:var(--gray-600);line-height:1.5;margin-bottom:10px;">${club.desc.substring(0,100)}${club.desc.length>100?"...":""}</p>
        <div class="club-card-footer">
          <div class="club-participants">
            <div style="display:flex;">${club.participants.slice(0,4).map(pid=>{const p=DB.users.find(u=>u.id===pid);return p?`<img src="${p.img}" style="width:26px;height:26px;border-radius:50%;border:2px solid white;margin-left:-6px;object-fit:cover;first-child:margin-left:0" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=${p.color.replace('#','')}&color=fff&bold=true&size=50'">`:""}).join("")}</div>
            <span class="club-count">${club.participants.length}/${club.maxParticipants}</span>
          </div>
          <div style="display:flex;gap:6px;align-items:center;">
            ${remaining > 0
              ? `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();ClubSystem.join('${club.id}')">Rejoindre</button>`
              : `<span style="font-size:11px;color:var(--gray-400);font-weight:600;">Complet</span>`}
          </div>
        </div>
      </div>`;
  },

  showDetail(clubId) {
    const club = DB.clubs.find(c => c.id === clubId);
    if (!club) return;
    const zone = DB.zones[club.zone];
    const organizer = DB.users.find(u => u.id === club.organizer);
    const actEmoji = {footing:"\u{1F3C3}",marche:"\u{1F6B6}",trail:"\u26F0"}[club.activity]||"\u{1F465}";
    const remaining = club.maxParticipants - club.participants.length;
    document.getElementById("modal-trail-content").innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
        <div style="width:56px;height:56px;background:var(--energy-100);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;">${actEmoji}</div>
        <div><div style="font-size:18px;font-weight:900;color:var(--gray-900);">${club.name}</div><div style="font-size:12px;color:var(--gray-500);margin-top:2px;">${zone?.icon||""} ${zone?.name||club.zone} · ${club.activity} · ${club.time}</div></div>
      </div>
      <p style="font-size:13px;color:var(--gray-600);line-height:1.6;margin-bottom:16px;">${club.desc}</p>
      ${organizer ? `<div style="background:var(--forest-50);border-radius:12px;padding:12px;margin-bottom:16px;border:1px solid var(--forest-100);">
        <div style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Organisateur</div>
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="${organizer.img}" style="width:36px;height:36px;border-radius:50%;border:2px solid ${organizer.color};object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(organizer.name)}&background=${organizer.color.replace('#','')}&color=fff&bold=true&size=50'">
          <div><div style="font-size:13px;font-weight:800;color:var(--gray-900);">${organizer.name}</div><div style="font-size:11px;color:var(--gray-500);">${organizer.handle}</div></div>
        </div>
      </div>` : ""}
      <div style="display:flex;gap:10px;margin-top:8px;">
        ${remaining > 0
          ? `<button class="btn btn-energy btn-lg" style="flex:1;" onclick="ClubSystem.join('${club.id}');Modal.closeAll()"><i class="fas fa-users"></i> Rejoindre</button>`
          : `<button class="btn btn-ghost btn-lg" style="flex:1;opacity:0.5;cursor:not-allowed;">Complet</button>`}
        <button class="btn btn-ghost btn-md" onclick="Modal.closeAll()"><i class="fas fa-times"></i></button>
      </div>`;
    Modal.open("trail-detail");
  },

  async join(clubId) {
    const result = await MockAPI.joinClub(clubId, 0);
    if (result.success) {
      Store.addXP(25, "Club rejoint");
      Toast.show("Club rejoint !", result.data.name, "orange", "users");
      this.render();
    } else {
      Toast.show("Impossible", result.error, "orange", "exclamation-triangle");
    }
  },

  openCreateModal() { Modal.open("create-club"); },

  selectActivity(act, el) {
    document.querySelectorAll("#club-activity-selector .chip").forEach(c => c.className = "chip chip-default");
    if (el) el.className = "chip chip-active";
    this._activity = act;
  },

  async createClub() {
    const name = document.getElementById("club-name-input")?.value?.trim();
    const zone = document.getElementById("club-zone-input")?.value;
    const time = document.getElementById("club-time-input")?.value;
    const max  = parseInt(document.getElementById("club-max-input")?.value) || 8;
    if (!name || name.length < 3) { Toast.show("Nom requis", "Min 3 caracteres", "orange", "exclamation"); return; }
    const zoneData = DB.zones[zone];
    if (!zoneData) { Toast.show("Zone invalide", "Selectionnez une zone", "orange", "exclamation"); return; }
    Modal.closeAll();
    const result = await MockAPI.createClub({
      name, zone, activity:this._activity, time, maxParticipants:max,
      organizer:0, desc:`Club cree maintenant. ${this._activity} dans ${zoneData.name}. Depart ${time}.`,
      coords:[zoneData.coords[0]+(Math.random()-0.5)*0.01, zoneData.coords[1]+(Math.random()-0.5)*0.01],
    });
    if (result.success) {
      Store.addXP(50, "Club cree");
      Toast.show("Club cree !", result.data.name, "orange", "star");
      App.nav("clubs");
    }
  },

  filterClubs(filter, el) {
    document.querySelectorAll("#clubs-filter .chip").forEach(c => c.className = "chip chip-default");
    if (el) el.className = "chip chip-active";
    this.render(filter);
  },

  inviteToClub(userId) {
    Modal.closeAll();
    const user = DB.users.find(u => u.id === userId);
    Toast.show("Invitation envoyee !", `${user?.name?.split(" ")[0]||"Cet utilisateur"} a ete invite`, "green", "paper-plane");
  },
  },

  inviteToUser(uid, btn) {
    if (btn) { btn.innerHTML = "&#10003; Invité"; btn.className = "btn btn-sent btn-md"; btn.disabled = true; }
    Store.data.invitedUsers = Store.data.invitedUsers || [];
    if (!Store.data.invitedUsers.includes(uid)) Store.data.invitedUsers.push(uid);
    Store.save();
    const u = DB.users.find(x => x.id === uid);
    Toast.show("Invitation envoyée !", u?.name?.split(" ")[0] || "", "green", "paper-plane");
  },

// =============================================================================
// MODULE 14 — PROFILE
// =============================================================================
const ProfileView = {
  _chart: null,

  render() {
    const p = Store.data.myProfile;
    const setEl = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
    const setSt = (id, prop, v) => { const el=document.getElementById(id); if(el) el.style[prop]=v; };

    setEl("profile-name", p.name);
    setEl("profile-handle", `${p.handle} · Rennes`);
    setEl("pstat-km", (p.km||0).toFixed(1));
    setEl("pstat-friends", p.friends||0);
    setEl("pstat-rank", "#"+(p.rank||"--"));
    const lvlName = ["Explorateur","Coureur","Traileur","Habitue","Sportif","Expert","Maitre","Legende"][Math.min((p.level||1)-1,7)];
    setEl("profile-level-name", lvlName);
    setEl("profile-level-sub", `Niveau ${p.level||1} · ${(p.xp||0).toLocaleString("fr")} XP`);
    const xpPct = Math.min(((p.xp||0) % 800) / 800 * 100, 100);
    setSt("profile-xp-bar", "width", xpPct+"%");
    const nextXP = (p.level||1)*800;
    setEl("profile-xp-to-next", `+${Math.max(0,nextXP-(p.xp%800))} XP pour Niveau ${(p.level||1)+1}`);

    this._renderBadges();
    this._renderChart();
  },

  _renderBadges() {
    const grid = document.getElementById("badges-grid");
    if (!grid) return;
    const unlocked = DB.badges.filter(b => b.unlocked).length;
    const cnt = document.getElementById("badges-count");
    if (cnt) cnt.textContent = `${unlocked} / ${DB.badges.length}`;
    grid.innerHTML = DB.badges.map(b => `
      <div class="badge-item ${b.unlocked?"":"locked"}" onclick="${b.unlocked?`Toast.show('${b.name}','${b.desc}','green','medal')`:`Toast.show('Verrouille','${b.desc}','green','lock')`}">
        <span class="badge-icon">${b.icon}</span>
        <span class="badge-name">${b.name}</span>
      </div>`).join("");
  },

  _renderChart() {
    const canvas = document.getElementById("skills-radar-chart");
    if (!canvas) return;
    if (this._chart) this._chart.destroy();
    this._chart = new Chart(canvas.getContext("2d"), {
      type: "radar",
      data: {
        labels: ["Endurance","Vitesse","Technique","Social","Regularite","Exploration"],
        datasets: [{ label:"Profil", data:[72,55,48,85,68,90], backgroundColor:"rgba(45,106,79,0.15)", borderColor:"#2D6A4F", borderWidth:2, pointBackgroundColor:"#2D6A4F", pointRadius:4 }]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        plugins:{ legend:{display:false} },
        scales:{ r:{ min:0, max:100, ticks:{display:false}, grid:{color:"rgba(45,106,79,0.12)"}, pointLabels:{font:{size:10,weight:"700"},color:"#4A5568"}, angleLines:{color:"rgba(45,106,79,0.1)"} } }
      }
    });
  },
};

// =============================================================================
// MODULE 15 — SECURITY
// =============================================================================
const Security = {
  _sosTimer: null,
  triggerSOS() {
    Toast.show("Mode SOS", "Maintenez 3s pour appeler le 15", "red", "exclamation-triangle");
    if (!this._sosTimer) {
      this._sosTimer = setTimeout(() => {
        alert("SIMULATION SECURITE : En situation reelle, le 15 (SAMU) serait appele. Conformite RGPD Mairie de Rennes.");
        this._sosTimer = null;
      }, 3000);
    }
    document.addEventListener("touchend", () => { if(this._sosTimer){ clearTimeout(this._sosTimer); this._sosTimer=null; } }, {once:true});
  },

  toggleAnonymous(input) {
    Store.update("settings.anonymous", input.checked);
    Toast.show(input.checked?"Mode Anonyme ON":"Mode Anonyme OFF", input.checked?"Position masquee":"Visible sur le radar", "green", "user-shield");
    if (RadarMap._mapFull) RadarMap._refreshLiveMarkers();
  },
  toggleGeo(input) {
    Store.update("settings.shareGeo", input.checked);
    Toast.show(input.checked?"Position partagee":"Position privee", "Parametre mis a jour", "green", "map-marker-alt");
  },
};

// =============================================================================
// MODULE 16 — MODAL
// =============================================================================
const Modal = {
  open(id) {
    document.getElementById("modal-backdrop")?.classList.add("show");
    document.getElementById(`modal-${id}`)?.classList.add("show");
  },
  closeAll() {
    document.querySelectorAll(".modal-sheet").forEach(m => m.classList.remove("show"));
    document.getElementById("modal-backdrop")?.classList.remove("show");
  },
};

// =============================================================================
// MODULE 17 — HOME VIEW
// =============================================================================
const HomeView = {
  async init() {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon apres-midi" : "Bonsoir";
    const heroGreeting = document.getElementById("hero-greeting");
    if (heroGreeting) heroGreeting.textContent = `${greeting}, ${(Store.data.myProfile.name||'sportif').split(" ")[0]} \u{1F44B}`;
    const topImg = document.getElementById("my-avatar-top");
    if (topImg) topImg.src = Store.data.myProfile.img || "https://ui-avatars.com/api/?name=R+M&background=2D6A4F&color=fff&bold=true&size=50";

    const p = Store.data.myProfile;
    const setEl = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
    setEl("stat-km", (p.km||34.2).toFixed(1));
    setEl("stat-sessions", p.sessions||12);
    setEl("stat-friends", p.friends||7);
    setEl("stat-streak", p.streak||4);

    const weather = await MockAPI.fetchWeather();
    if (weather.success) {
      const heroSub = document.getElementById("hero-subtitle");
      if (heroSub) heroSub.textContent = `${weather.data.temp}\u00B0C \u00B7 ${weather.data.desc} \u00B7 ${DB.users.filter(u=>u.online).length} sportifs actifs`;
      const heroTag = document.getElementById("hero-weather-tag");
      const icons = {cloud:'fa-cloud', 'cloud-sun':'fa-cloud-sun', 'cloud-drizzle':'fa-cloud-rain', sun:'fa-sun', wind:'fa-wind'};
      const faIcon = icons[weather.data.icon] || 'fa-sun';
      if (heroTag) heroTag.innerHTML = `<i class="fas ${faIcon}"></i> ${weather.data.temp}\u00B0C \u00B7 ${weather.data.desc}`;
    }

    setTimeout(() => {
      const mapEl = document.getElementById("home-mini-map");
      if (mapEl && !mapEl.children.length) RadarMap.initMini("home-mini-map");
    }, 400);

    this._renderActivityFeed();
    this._renderMatchesPreview();
    ClubSystem._renderHomeClubs();
  },

  _renderActivityFeed() {
    const feed = [
      { icon:"\u{1F332}", bg:"var(--forest-100)", title:"Session terminee — Le Parcours Beauregard", meta:"Aujourd'hui · 34 min · 3.0 km", time:"18h42" },
      { icon:"\u{1F465}", bg:"var(--energy-100)", title:"Poc recu de Lea Martin", meta:"Hey ! Je suis dans ta zone, on court ensemble ?", time:"17h15" },
      { icon:"\u2B50", bg:"#FEF3C7", title:"+50 XP gagnes", meta:"Session completee avec succes", time:"15h30" },
      { icon:"\u{1F3C6}", bg:"var(--forest-100)", title:"Badge debloque — Foret Rennaise", meta:"5 parcs differents visites", time:"Hier" },
      { icon:"\u{1F3C3}", bg:"var(--water-100)", title:"Antoine Dubois a rejoint votre club", meta:"Trail du Thabor — depart 18h", time:"Hier" },
    ];
    const container = document.getElementById("home-activity-feed");
    if (!container) return;
    container.innerHTML = feed.map(f => `
      <div class="activity-item">
        <div style="width:38px;height:38px;border-radius:12px;background:${f.bg};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${f.icon}</div>
        <div class="activity-content">
          <div class="activity-title">${f.title}</div>
          <div class="activity-meta">${f.meta}</div>
        </div>
        <div class="activity-time">${f.time}</div>
      </div>`).join("");
  },

  _renderMatchesPreview() {
    const container = document.getElementById("home-matches-preview");
    if (!container) return;
    const top = DB.users.filter(u => u.online).slice(0, 3);
    container.innerHTML = top.map(u => {
      const paceEmoji = {footing:"\u{1F3C3}",marche:"\u{1F6B6}",trail:"\u26F0"}[u.pace]||"";
      const safeName = encodeURIComponent(u.name);
      const safeColor = (u.color||"2D6A4F").replace("#","");
      return `
        <div style="display:flex;align-items:center;gap:12px;background:white;border-radius:16px;padding:12px;box-shadow:var(--shadow-sm);border:1px solid var(--color-border);cursor:pointer;" onclick="UserProfile.show(DB.users.find(x=>x.id===${u.id}))">
          <div style="position:relative;">
            <img src="${u.img}" style="width:42px;height:42px;border-radius:50%;border:2.5px solid ${u.color};object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${safeName}&background=${safeColor}&color=fff&bold=true&size=50'">
            <div style="position:absolute;bottom:0;right:0;width:11px;height:11px;background:#22C55E;border-radius:50%;border:2px solid white;"></div>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:14px;font-weight:800;color:var(--gray-900);">${u.name}</div>
            <div style="font-size:11px;color:var(--gray-500);margin-top:1px;">${paceEmoji} ${u.pace} · ${DB.zones[u.zone]?.name||u.zone}</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();PocSystem.send(${u.id})"><i class="fas fa-paper-plane"></i> Poc</button>
        </div>`;
    }).join("");
  },
};

// =============================================================================
// MODULE 18 — LIVE COUNTER
// =============================================================================
const LiveCounter = {
  _current: 47,
  start() {
    setInterval(() => {
      this._current = Math.max(28, Math.min(82, this._current + Math.floor(Math.random()*7)-3));
      const el = document.getElementById("live-count");
      if (el) el.textContent = this._current;
      const el2 = document.getElementById("home-mini-active");
      if (el2) el2.textContent = Math.floor(this._current*0.6);
    }, 15000);
  },
};

// =============================================================================
// MODULE 19 — BOOT
// =============================================================================
const Boot = {
  async run() {
    const splash = document.getElementById("splash");
    await new Promise(r => setTimeout(r, 2000));
    if (splash) { splash.style.opacity = "0"; setTimeout(() => { splash.style.display = "none"; }, 700); }
    Explorer.render();
    LiveCounter.start();
    if (!Store.data.onboardingDone || !Store.data.myProfile.name) {
      const auth = document.getElementById("auth-screen");
      if (auth) auth.style.display = "flex";
      return;
    }
    Onboarding.init();
    await HomeView.init();
    ProfileView.render();
    setTimeout(() => Toast.show("RennesMOOV \u{1F33F}", `${LiveCounter._current} sportifs actifs`, "green", "leaf"), 2800);
  },
};

// =============================================================================
// MODULE 20 — INIT & GLOBAL LISTENERS
// =============================================================================
document.addEventListener("DOMContentLoaded", () => Boot.run());
document.getElementById("modal-backdrop")?.addEventListener("click", () => Modal.closeAll());


// =============================================================================
// GEO UTILITIES
// =============================================================================
const Geo = {
  haversine(lat1,lon1,lat2,lon2){
    const R=6371,dLat=(lat2-lat1)*Math.PI/180,dLon=(lon2-lon1)*Math.PI/180;
    const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
    return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  },
  formatDistance(km){ return km<1?Math.round(km*1000)+' m':km.toFixed(1)+' km'; },
  getPosition(){
    return new Promise((res,rej)=>{
      if(!navigator.geolocation){rej(new Error('Non disponible'));return;}
      navigator.geolocation.getCurrentPosition(p=>res({lat:p.coords.latitude,lng:p.coords.longitude}),rej,{enableHighAccuracy:true,timeout:8000});
    });
  },
  watchPosition(cb,errCb){
    if(!navigator.geolocation){errCb(new Error('Non disponible'));return null;}
    return navigator.geolocation.watchPosition(p=>cb({lat:p.coords.latitude,lng:p.coords.longitude}),errCb,{enableHighAccuracy:true,maximumAge:3000,timeout:10000});
  },
};

// =============================================================================
// AUTH MODULE
// =============================================================================
const Auth = {
  _pace: 'footing',
  _avails: ['midi','soir'],
  _img: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=fox',

  _showStep(n){
    document.querySelectorAll('.auth-step').forEach(s=>s.classList.remove('active'));
    const s=document.getElementById(`auth-step-${n}`); if(s) s.classList.add('active');
    document.querySelectorAll('.auth-dot').forEach((d,i)=>{ d.classList.toggle('active',i<n); });
  },

  step1(){
    const name=document.getElementById('auth-name')?.value?.trim();
    const sport=document.getElementById('auth-sport')?.value;
    const age=document.getElementById('auth-age')?.value;
    if(!name){ Toast.show('Prénom requis','','orange','exclamation'); return; }
    if(!sport){ Toast.show('Sport requis','','orange','exclamation'); return; }
    Store.data.myProfile.name=name;
    Store.data.myProfile.sport=sport;
    Store.data.myProfile.age=parseInt(age)||0;
    Store.data.myProfile.handle='@'+name.toLowerCase().replace(/\s+/g,'_');
    this._showStep(2);
  },

  selectPace(pace,el){
    document.querySelectorAll('.auth-pace-option').forEach(o=>o.classList.remove('selected'));
    if(el) el.classList.add('selected');
    this._pace=pace;
  },

  step2(){
    if(!this._pace){ Toast.show('Choisissez une allure','','orange','exclamation'); return; }
    Store.data.myProfile.pace=this._pace;
    this._showStep(3);
  },

  toggleAvail(avail,el){
    const idx=this._avails.indexOf(avail);
    if(idx>=0){this._avails.splice(idx,1);if(el)el.className='chip chip-default';}
    else{this._avails.push(avail);if(el)el.className='chip chip-active';}
  },

  step3(){
    const zone=document.getElementById('auth-zone')?.value||'beauregard';
    Store.data.myProfile.zone=zone;
    Store.data.myProfile.avails=this._avails;
    this._showStep(4);
  },

  selectAvatar(el){
    document.querySelectorAll('.auth-avatar-option').forEach(o=>o.classList.remove('selected'));
    if(el){ el.classList.add('selected'); this._img=el.dataset.src||''; }
  },

  handlePhotoUpload(e){
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=ev=>{
      this._img=ev.target.result;
      document.querySelectorAll('.auth-avatar-option').forEach(o=>o.classList.remove('selected'));
      Toast.show('Photo importée !','Votre photo est prête','green','check');
    };
    r.readAsDataURL(f);
  },

  finish(){
    Store.data.myProfile.img=this._img;
    Store.data.myProfile.xp=Store.data.myProfile.xp||0;
    Store.data.myProfile.level=Store.data.myProfile.level||1;
    Store.data.myProfile.km=Store.data.myProfile.km||0;
    Store.data.myProfile.sessions=Store.data.myProfile.sessions||0;
    Store.data.myProfile.friends=Store.data.myProfile.friends||0;
    Store.data.myProfile.streak=Store.data.myProfile.streak||0;
    Store.data.myProfile.rank=Store.data.myProfile.rank||42;
    Store.save();
    const auth=document.getElementById('auth-screen');
    if(auth){ auth.style.opacity='0'; setTimeout(()=>{auth.style.display='none';},400); }
    // Forcer onboardingDone=false pour que les slides s'affichent
    Store.data.onboardingDone = false;
    Store.save();
    setTimeout(()=>{
      Onboarding.init();
      HomeView.init();
      ProfileView.render();
    }, 450);
    Toast.show(`Bienvenue ${Store.data.myProfile.name} !`, 'Votre aventure commence maintenant', 'green', 'leaf');
  },
};

// =============================================================================
// TRAIL DETAIL ENHANCEMENTS (GPS + mini map)
// =============================================================================
const TrailDetailExtra = {
  async showDistance(trailId){
    const t=DB.trails.find(x=>x.id===trailId); if(!t) return;
    const btn=document.getElementById('dist-btn-'+trailId);
    if(btn){ btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Localisation...'; btn.disabled=true; }
    try {
      const pos=await Geo.getPosition();
      const wp=t.waypoints&&t.waypoints[0];
      if(!wp){ if(btn){ btn.innerHTML='<i class="fas fa-location-arrow"></i> Distance au départ'; btn.disabled=false; } return; }
      const dist=Geo.haversine(pos.lat,pos.lng,wp.lat,wp.lng);
      const res=document.getElementById('dist-result-'+trailId);
      if(res){ res.style.display='block'; res.innerHTML=`<i class="fas fa-map-marker-alt"></i> Vous êtes à <strong>${Geo.formatDistance(dist)}</strong> du départ — ${wp.title}`; }
      if(btn) btn.style.display='none';
    } catch(e){
      if(btn){ btn.innerHTML='<i class="fas fa-location-arrow"></i> Distance au départ'; btn.disabled=false; }
      Toast.show('Géolocalisation','Autorisation refusée ou indisponible','orange','exclamation-triangle');
    }
  },

  drawMiniMap(trailId){
    const t=DB.trails.find(x=>x.id===trailId); if(!t) return;
    const id=`trail-mini-map-${trailId}`;
    const el=document.getElementById(id); if(!el||typeof L==='undefined') return;
    try {
      const map=L.map(id,{zoomControl:false,attributionControl:false,scrollWheelZoom:false,dragging:true});
      // Tiles style carte de rue (OSM via CartoDB Voyager = carte réelle avec noms de rues)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
        subdomains:'abcd',maxZoom:18,attribution:'(c) OpenStreetMap (c) CARTO'
      }).addTo(map);
      const wps=t.waypoints||[];
      if(wps.length>0){
        const latlngs=wps.map(wp=>[wp.lat,wp.lng]);
        // Ombre du tracé
        L.polyline(latlngs,{color:'rgba(0,0,0,0.18)',weight:8,opacity:1}).addTo(map);
        // Tracé principal épais vert
        L.polyline(latlngs,{color:'#2D6A4F',weight:5,opacity:1}).addTo(map);
        // Points cliquables sur le tracé (interpolés)
        wps.forEach((wp,i)=>{
          const isStart=i===0, isEnd=i===wps.length-1;
          const bg=isStart?'#22C55E':isEnd?'#EF4444':'#2D6A4F';
          const label=isStart?'D':isEnd?'A':(i+1).toString();
          const size=isStart||isEnd?28:22;
          const icon=L.divIcon({className:'',html:`<div style="width:${size}px;height:${size}px;background:${bg};color:white;border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${isStart||isEnd?11:9}px;font-weight:900;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${label}</div>`,iconSize:[size,size],iconAnchor:[size/2,size/2]});
          L.marker([wp.lat,wp.lng],{icon}).addTo(map).bindTooltip(wp.title,{permanent:false,direction:'top',offset:[0,-12]});
        });
        map.fitBounds(L.latLngBounds(latlngs),{padding:[24,24],maxZoom:16});
      } else {
        // Si pas de waypoints, centrer sur la zone
        const z=DB.zones[t.zone];
        if(z) map.setView(z.coords,14);
      }
      setTimeout(()=>map.invalidateSize(),200);
    } catch(e){ console.warn('Mini map:',e); }
  },
};

// =============================================================================
// TRAIL SESSION (mode plein écran)
// =============================================================================
const BREATHING_TIPS = [
  'Inspirez sur 2 pas, expirez sur 2 pas. Rythmez votre respiration.',
  'Respirez par le nez, sortez par la bouche. Contrôlez le flux.',
  'Gardez le buste droit pour dégager vos poumons et respirer librement.',
  'Relâchez les épaules. Les tensions nuisent à la capacité respiratoire.',
  'Ralentissez si vous ne pouvez plus parler. Gardez une allure comfortable.',
  'Hydratez-vous régulièrement. Une légère déshydratation réduit les performances.',
];
const WARMUP_TIPS = [
  'Rotations chevilles et genoux pour protéger vos articulations.',
  'Étirez vos mollets contre un mur, 30 secondes chaque jambe.',
  'Montées de genoux sur place pendant 30 secondes.',
  'Grandes inspirations abdominales pour oxygéner les muscles.',
  'Quelques fentes avant pour activer les quadriceps.',
];

const TrailSession = {
  _trail: null, _warmupTimer: null, _runTimer: null,
  _warmupRemain: 300, _runSec: 0, _distKm: 0,
  _watchId: null, _lastPos: null, _running: false,
  _alertTimeout: null, _tipInterval: null,

  start(id){
    const t=DB.trails.find(x=>x.id===id); if(!t) return;
    this._trail=t;
    this._warmupRemain=300; this._runSec=0; this._distKm=0; this._lastPos=null;
    const el=document.getElementById('trail-session-overlay'); if(!el) return;
    document.getElementById('session-trail-name').textContent=t.title;
    document.getElementById('session-warmup-phase').style.display='flex';
    document.getElementById('session-run-phase').style.display='none';
    document.getElementById('session-skip-btn').style.display='block';
    document.getElementById('session-finish-btn').style.display='none';
    document.getElementById('warmup-display').textContent='5:00';
    document.getElementById('warmup-ring-circle').style.strokeDashoffset='0';
    el.classList.add('active');
    this._startWarmup();
  },

  _startWarmup(){
    clearInterval(this._warmupTimer);
    let ti=0;
    const tipEl=document.getElementById('warmup-tip');
    if(tipEl) tipEl.textContent=WARMUP_TIPS[0];
    this._warmupTimer=setInterval(()=>{
      this._warmupRemain--;
      if(tipEl && this._warmupRemain%60===0){ ti=(ti+1)%WARMUP_TIPS.length; tipEl.textContent=WARMUP_TIPS[ti]; }
      const m=Math.floor(this._warmupRemain/60),s=this._warmupRemain%60;
      const el=document.getElementById('warmup-display');
      if(el) el.textContent=`${m}:${s.toString().padStart(2,'0')}`;
      const ring=document.getElementById('warmup-ring-circle');
      if(ring) ring.style.strokeDashoffset=533.8*(this._warmupRemain/300);
      if(this._warmupRemain<=0){ clearInterval(this._warmupTimer); this._startRun(); }
    },1000);
  },

  skipWarmup(){
    clearInterval(this._warmupTimer);
    Toast.show('Échauffement passé','Attention aux blessures !','orange','exclamation-triangle');
    this._startRun();
  },

  _startRun(){
    document.getElementById('session-warmup-phase').style.display='none';
    document.getElementById('session-run-phase').style.display='flex';
    document.getElementById('session-skip-btn').style.display='none';
    document.getElementById('session-finish-btn').style.display='block';
    this._running=true;
    clearInterval(this._runTimer);
    this._runTimer=setInterval(()=>{
      this._runSec++;
      const m=Math.floor(this._runSec/60),s=this._runSec%60;
      const chronoEl=document.getElementById('run-chrono');
      if(chronoEl) chronoEl.textContent=`${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
      const kcal=Math.floor(this._runSec*0.085);
      const kcalEl=document.getElementById('run-kcal'); if(kcalEl) kcalEl.textContent=kcal;
      if(this._distKm>0.05){
        const pace=this._runSec/60/this._distKm;
        const pm=Math.floor(pace),ps=Math.round((pace-pm)*60);
        const paceEl=document.getElementById('run-pace'); if(paceEl) paceEl.textContent=`${pm}'${ps.toString().padStart(2,'0')}"`;
      }
    },1000);
    // Tips
    let ti=0;
    const tipEl=document.getElementById('run-tip');
    if(tipEl) tipEl.textContent=BREATHING_TIPS[0];
    this._tipInterval=setInterval(()=>{ ti=(ti+1)%BREATHING_TIPS.length; if(tipEl) tipEl.textContent=BREATHING_TIPS[ti]; },18000);
    // GPS
    this._watchId=Geo.watchPosition(pos=>{
      if(this._lastPos){
        const d=Geo.haversine(this._lastPos.lat,this._lastPos.lng,pos.lat,pos.lng);
        if(d>0.003) this._distKm+=d;
      }
      this._lastPos=pos;
      const distEl=document.getElementById('run-distance'); if(distEl) distEl.textContent=this._distKm.toFixed(2);
    },()=>{ this._simulateDist(); });
    this._scheduleAlert();
  },

  _simulateDist(){
    const pace={marche:0.0007,footing:0.0016,trail:0.0013}[this._trail?.pace||'footing'];
    const sim=setInterval(()=>{ if(!this._running){clearInterval(sim);return;} this._distKm+=pace; const e=document.getElementById('run-distance'); if(e) e.textContent=this._distKm.toFixed(2); },1000);
  },

  _scheduleAlert(){
    const delay=20000+Math.random()*35000;
    this._alertTimeout=setTimeout(()=>{
      if(!this._running) return;
      const online=DB.users.filter(u=>u.online);
      const user=online[Math.floor(Math.random()*online.length)];
      if(user) this._showAlert(user);
      this._scheduleAlert();
    },delay);
  },

  _showAlert(user){
    const old=document.querySelector('.session-alert'); if(old) old.remove();
    const a=document.createElement('div');
    a.className='session-alert';
    const pe={footing:'🏃',marche:'🚶',trail:'⛰️'}[user.pace]||'🏃';
    a.innerHTML=`<span style="font-size:20px;">${pe}</span><span>${user.name.split(' ')[0]} est à moins de 200m de vous !</span>`;
    document.getElementById('trail-session-overlay').appendChild(a);
    setTimeout(()=>{ if(a.parentNode) a.remove(); },5000);
  },

  abort(){
    this._cleanup();
    const el=document.getElementById('trail-session-overlay');
    if(el) el.classList.remove('active');
  },

  finish(){
    this._cleanup();
    const el=document.getElementById('trail-session-overlay');
    if(el) el.classList.remove('active');
    const xp=50+Math.floor(this._distKm*10);
    const kcal=Math.floor(this._runSec*0.085);
    const m=Math.floor(this._runSec/60),s=this._runSec%60;
    Store.data.sessions=Store.data.sessions||[];
    Store.data.sessions.unshift({id:'s'+Date.now(),trailId:this._trail?.id,trailTitle:this._trail?.title,date:new Date().toLocaleDateString('fr'),duration:`${m}min ${s}s`,distance:this._distKm.toFixed(2),kcal,xp});
    Store.data.myProfile.km=(Store.data.myProfile.km||0)+parseFloat(this._distKm.toFixed(2));
    Store.data.myProfile.sessions=(Store.data.myProfile.sessions||0)+1;
    Store.save();
    Store.addXP(xp,'Parcours terminé');
    document.getElementById('modal-session-summary-content').innerHTML=`
      <div style="text-align:center;padding:10px 0 20px;">
        <div style="font-size:52px;margin-bottom:10px;">🏅</div>
        <div style="font-size:20px;font-weight:900;color:var(--gray-900);margin-bottom:4px;">Parcours terminé !</div>
        <div style="font-size:13px;color:var(--gray-500);margin-bottom:20px;">${this._trail?.title||'Session'}</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">
          <div style="background:var(--forest-50);border-radius:14px;padding:12px;border:1px solid var(--forest-100);">
            <div style="font-size:18px;font-weight:900;color:var(--forest-700);">${m}:${s.toString().padStart(2,'0')}</div>
            <div style="font-size:9px;color:var(--gray-500);font-weight:700;text-transform:uppercase;margin-top:2px;">Temps</div>
          </div>
          <div style="background:var(--forest-50);border-radius:14px;padding:12px;border:1px solid var(--forest-100);">
            <div style="font-size:18px;font-weight:900;color:var(--forest-700);">${this._distKm.toFixed(2)}</div>
            <div style="font-size:9px;color:var(--gray-500);font-weight:700;text-transform:uppercase;margin-top:2px;">km</div>
          </div>
          <div style="background:var(--energy-100);border-radius:14px;padding:12px;border:1px solid var(--energy-200);">
            <div style="font-size:18px;font-weight:900;color:var(--energy-600);">+${xp}</div>
            <div style="font-size:9px;color:var(--gray-500);font-weight:700;text-transform:uppercase;margin-top:2px;">XP</div>
          </div>
        </div>
        <div style="background:var(--forest-100);border-radius:12px;padding:10px;margin-bottom:16px;border:1px solid var(--forest-200);">
          <div style="font-size:12px;color:var(--forest-800);font-weight:700;">🔥 ${kcal} kcal brûlées · Session sauvegardée</div>
        </div>
        <button class="btn btn-primary btn-lg btn-full" onclick="Modal.closeAll();App.nav('home')"><i class="fas fa-home"></i> Retour à l'accueil</button>
      </div>`;
    Modal.open('session-summary');
  },

  _cleanup(){
    this._running=false;
    clearInterval(this._warmupTimer); clearInterval(this._runTimer); clearInterval(this._tipInterval);
    clearTimeout(this._alertTimeout);
    if(this._watchId!=null){ navigator.geolocation?.clearWatch(this._watchId); this._watchId=null; }
    const old=document.querySelector('.session-alert'); if(old) old.remove();
  },
};

// =============================================================================
// PROFILE EDIT
// =============================================================================
const ProfileEdit = {
  open(){
    const p=Store.data.myProfile;
    const sports=['Footing','Trail','Marche','Vélo','Fitness','Autre'];
    document.getElementById('modal-profile-edit-content').innerHTML=`
      <div style="display:flex;flex-direction:column;gap:14px;">
        <div>
          <label class="text-xs fw-7 text-muted" style="display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Prénom</label>
          <input type="text" class="input-field" id="edit-name" value="${p.name||''}" maxlength="30">
        </div>
        <div>
          <label class="text-xs fw-7 text-muted" style="display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Sport favori</label>
          <select class="input-field" id="edit-sport">${sports.map(s=>`<option value="${s}" ${p.sport===s?'selected':''}>${s}</option>`).join('')}</select>
        </div>
        <div>
          <label class="text-xs fw-7 text-muted" style="display:block;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Photo de profil</label>
          <div style="display:flex;gap:10px;align-items:center;">
            <img id="edit-preview" src="${p.img||''}" style="width:56px;height:56px;border-radius:50%;border:2px solid var(--forest-300);object-fit:cover;">
            <div style="display:flex;flex-direction:column;gap:6px;flex:1;">
              <label style="background:var(--forest-100);border:1px solid var(--forest-300);color:var(--forest-800);border-radius:10px;padding:8px 12px;font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
                <i class="fas fa-camera"></i> Importer depuis galerie
                <input type="file" accept="image/*" style="display:none;" onchange="ProfileEdit.handlePhoto(event)">
              </label>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                ${['fox','deer','wolf','bear','owl'].map(a=>`<div onclick="ProfileEdit.selectAvatar('${a}')" style="width:32px;height:32px;border-radius:50%;overflow:hidden;border:2px solid var(--gray-200);cursor:pointer;background:var(--gray-50);"><img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=${a}" style="width:100%;height:100%;"></div>`).join('')}
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary btn-lg btn-full mt-2" onclick="ProfileEdit.save()"><i class="fas fa-check"></i> Enregistrer</button>
      </div>`;
    Modal.open('profile-edit');
  },
  handlePhoto(e){
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader();
    r.onload=ev=>{ Store.data.myProfile._pendingImg=ev.target.result; const i=document.getElementById('edit-preview'); if(i) i.src=ev.target.result; };
    r.readAsDataURL(f);
  },
  selectAvatar(id){
    const url=`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${id}`;
    Store.data.myProfile._pendingImg=url;
    const i=document.getElementById('edit-preview'); if(i) i.src=url;
  },
  save(){
    const name=document.getElementById('edit-name')?.value?.trim();
    const sport=document.getElementById('edit-sport')?.value;
    if(!name){ Toast.show('Prénom requis','','orange','exclamation'); return; }
    if(Store.data.myProfile._pendingImg){ Store.data.myProfile.img=Store.data.myProfile._pendingImg; delete Store.data.myProfile._pendingImg; }
    Store.data.myProfile.name=name;
    Store.data.myProfile.sport=sport;
    Store.data.myProfile.handle='@'+name.toLowerCase().replace(/\s+/g,'_');
    Store.save();
    Modal.closeAll();
    ProfileView.render();
    // Mettre à jour le greeting accueil
    const h=new Date().getHours();
    const g=h<12?'Bonjour':h<18?'Bon après-midi':'Bonsoir';
    const greetEl=document.getElementById('hero-greeting');
    if(greetEl) greetEl.textContent=`${g}, ${Store.data.myProfile.name.split(' ')[0]} \u{1F44B}`;
    const topImg=document.getElementById('my-avatar-top'); if(topImg) topImg.src=Store.data.myProfile.img||'';
    Toast.show('Profil mis à jour !','Modifications enregistrées','green','check');
  },
};

// =============================================================================
// PROFILE VIEW ENHANCEMENTS (XP chart, completion, views)
// =============================================================================
const ProfileViewExtra = {
  _xpChart: null,

  renderExtras(){
    this._renderCompletion();
    this._renderXPChart();
    const setEl=(id,v)=>{ const el=document.getElementById(id); if(el) el.textContent=v; };
    setEl('profile-views', 18+Math.floor(Math.random()*20));
    setEl('profile-pocs', 4+Math.floor(Math.random()*8));
  },

  _renderCompletion(){
    const p=Store.data.myProfile;
    const checks=[!!p.name, !!p.img&&!p.img.includes('ui-avatars'), !!p.sport, !!(p.avails&&p.avails.length), !!(p.km>0), !!(p.friends>0)];
    const pct=Math.round(checks.filter(Boolean).length/checks.length*100);
    const bar=document.getElementById('profile-completion-bar'); if(bar) bar.style.width=pct+'%';
    const pctEl=document.getElementById('profile-completion-pct'); if(pctEl) pctEl.textContent=pct+'%';
    const hints=['Ajoutez un sport favori','Ajoutez une vraie photo','Renseignez vos disponibilités','Completez votre première session','Faites votre première rencontre','Profil complet !'];
    const hint=hints.find((_,i)=>!checks[i])||'Profil complet ! 🎉';
    const hintEl=document.getElementById('profile-completion-hint'); if(hintEl) hintEl.textContent=hint;
  },

  _renderXPChart(){
    const canvas=document.getElementById('xp-week-chart'); if(!canvas) return;
    if(this._xpChart) this._xpChart.destroy();
    const days=['L','M','M','J','V','S','D'];
    const data=[40,85,0,120,60,200,50];
    this._xpChart=new Chart(canvas.getContext('2d'),{
      type:'bar',
      data:{labels:days,datasets:[{data,backgroundColor:'rgba(45,106,79,0.18)',borderColor:'#40916C',borderWidth:2,borderRadius:6,borderSkipped:false}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>`+${ctx.raw} XP`}}},
        scales:{x:{grid:{display:false},ticks:{font:{size:10,weight:'700'},color:'#A0AEC0'}},y:{display:false,grid:{display:false}}}}
    });
  },
};

// =============================================================================
// CLUBS: ajouter _renderMyClubs + leave
// =============================================================================
const _origClubRender = ClubSystem.render.bind(ClubSystem);
ClubSystem.render = function(filter) {
  _origClubRender(filter);
  this._renderMyClubs();
};
ClubSystem._renderMyClubs = function(){
  const myClubs=DB.clubs.filter(c=>c.participants.includes(0));
  const sec=document.getElementById('my-clubs-section');
  if(sec) sec.style.display=myClubs.length?'block':'none';
  const c=document.getElementById('my-clubs-list'); if(!c) return;
  c.innerHTML=myClubs.map(cl=>{
    const z=DB.zones[cl.zone];
    const ae={footing:'🏃',marche:'🚶',trail:'⛰️'}[cl.activity]||'';
    return `<div class="club-joined-item" style="display:flex;align-items:center;gap:10px;background:white;border-radius:14px;padding:10px 12px;box-shadow:var(--shadow-sm);border:1px solid var(--color-border);">
      <div style="width:36px;height:36px;background:var(--energy-100);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">${ae}</div>
      <div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:800;color:var(--gray-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${cl.name}</div><div style="font-size:11px;color:var(--gray-500);margin-top:1px;">${z?.icon||''} ${z?.name||cl.zone} · ${cl.time}</div></div>
      <button class="btn btn-danger btn-sm" onclick="ClubSystem.leave('${cl.id}')">Quitter</button>
    </div>`;
  }).join('');
};
ClubSystem.leave = function(id){
  const c=DB.clubs.find(x=>x.id===id); if(!c) return;
  c.participants=c.participants.filter(p=>p!==0);
  Toast.show('Club quitté','Vous avez quitté le club','orange','sign-out-alt');
  this.render();
};

// =============================================================================
// POC: tracking envoyés pour changer le bouton
// =============================================================================
const _origPocSend = PocSystem.send.bind(PocSystem);
PocSystem.send = async function(userId) {
  const user=DB.users.find(u=>u.id===userId); if(!user) return;
  const btns=document.querySelectorAll(`[data-poc-user="${userId}"]`);
  btns.forEach(b=>{ b.innerHTML='<i class="fas fa-spinner fa-spin"></i>'; b.disabled=true; });
  const btn=document.getElementById(`poc-send-btn-${userId}`);
  if(btn){ btn.innerHTML='<i class="fas fa-spinner fa-spin"></i>'; btn.disabled=true; }
  const r = await MockAPI.sendPoc(0, userId);
  if(r.success){
    Store.data.pocsSent=Store.data.pocsSent||[];
    Store.data.pocsSent.push({toId:userId,timestamp:Date.now()});
    Store.save();
    Store.addXP(10,'Poc envoyé');
    btns.forEach(b=>{ b.className='btn btn-sent btn-sm'; b.innerHTML='\u2713 Envoyé'; b.disabled=true; });
    if(btn){ btn.className='btn btn-sent btn-lg'; btn.style.flex='1'; btn.innerHTML='\u2713 Poc envoyé'; btn.disabled=true; }
    Toast.show(`Poc envoyé à ${user.name.split(' ')[0]} !`,'Il/elle répondra bientôt','green','paper-plane');
  }
  Modal.closeAll();
};

// =============================================================================
// PATCH TrailDetail.show pour inclure GPS + mini map
// =============================================================================
const _origTrailShow = TrailDetail.show.bind(TrailDetail);
TrailDetail.show = function(id) {
  _origTrailShow(id);
  // After modal opens, inject GPS button + mini map container before "Lancer"
  setTimeout(()=>{
    const content=document.getElementById('modal-trail-content'); if(!content) return;
    const launchBtn=content.querySelector('button.btn-primary');
    if(!launchBtn) return;
    // Add GPS distance button + mini map if not already there
    if(!document.getElementById('dist-btn-'+id)){
      const gpsDiv=document.createElement('div');
      gpsDiv.style.marginBottom='12px';
      gpsDiv.innerHTML=`
        <button id="dist-btn-${id}" class="btn btn-ghost btn-full" style="border-radius:14px;padding:11px;margin-bottom:8px;" onclick="TrailDetailExtra.showDistance('${id}')">
          <i class="fas fa-location-arrow"></i> Voir ma distance au départ
        </button>
        <div id="dist-result-${id}" style="display:none;background:var(--water-100);border:1px solid var(--water-200);border-radius:12px;padding:10px 14px;font-size:12px;font-weight:700;color:var(--water-600);margin-bottom:8px;"></div>
        <div style="font-size:13px;font-weight:800;color:var(--gray-900);margin-bottom:6px;">Tracé du parcours</div>
        <div id="trail-mini-map-${id}" style="height:155px;border-radius:14px;overflow:hidden;border:1px solid var(--forest-100);box-shadow:var(--shadow-sm);margin-bottom:14px;"></div>`;
      launchBtn.parentNode.insertBefore(gpsDiv, launchBtn.parentNode.firstChild);
      TrailDetailExtra.drawMiniMap(id);
    }
    // Wire up launch button to TrailSession
    launchBtn.onclick=()=>{ Modal.closeAll(); TrailSession.start(id); };
  }, 400);
};

// =============================================================================
// PATCH ProfileView.render pour extras
// =============================================================================
const _origProfileRender = ProfileView.render.bind(ProfileView);
ProfileView.render = function() {
  _origProfileRender();
  // Update avatar
  const p=Store.data.myProfile;
  const img=document.getElementById('profile-avatar-img'); if(img) img.src=p.img||'';
  const topImg=document.getElementById('my-avatar-top'); if(topImg) topImg.src=p.img||'';
  ProfileViewExtra.renderExtras();
};

// =============================================================================
// PATCH RadarMap pour ajouter venues
// =============================================================================
const _origRadarFull = RadarMap.initFull.bind(RadarMap);
RadarMap.initFull = function() {
  _origRadarFull();
  if(!this._mapFull || !DB.venues) return;
  const venueTypes={stadium:['🏟️','#DC2626'],pool:['🏊','#2563EB'],gym:['🏋️','#7C3AED'],tennis:['🎾','#D97706'],bike:['🚴','#0891B2'],park:['🌳','#16A34A']};
  DB.venues.forEach(v=>{
    const [icon,color]=venueTypes[v.type]||['📍','#374151'];
    const marker=L.divIcon({className:'',html:`<div style="display:flex;flex-direction:column;align-items:center;"><div style="width:28px;height:28px;background:${color};border-radius:8px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;font-size:13px;">${icon}</div></div>`,iconSize:[28,28],iconAnchor:[14,28]});
    const m=L.marker([v.lat,v.lng],{icon:marker}).addTo(this._mapFull);
    m.bindPopup(`<div style="padding:10px;min-width:150px;font-family:'Inter',sans-serif;"><div style="font-weight:800;font-size:12px;color:#1A1A2E;margin-bottom:3px;">${v.name}</div><div style="font-size:10px;color:#718096;">${v.address}</div></div>`);
  });
};

window.App=App; window.Modal=Modal; window.Toast=Toast; window.Onboarding=Onboarding;
window.RadarMap=RadarMap; window.Explorer=Explorer; window.TrailDetail=TrailDetail;
window.UserProfile=UserProfile; window.PocSystem=PocSystem; window.Matching=Matching;
window.ClubSystem=ClubSystem; window.ProfileView=ProfileView; window.Security=Security;
window.Store=Store; window.DB=DB; window.HomeView=HomeView;
window.Auth=Auth; window.ProfileEdit=ProfileEdit; window.TrailSession=TrailSession;
window.TrailDetailExtra=TrailDetailExtra; window.ProfileViewExtra=ProfileViewExtra;
window.Geo=Geo;
