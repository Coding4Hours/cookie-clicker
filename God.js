Game.Win('Third-party');
if(God === undefined) var God = {};
if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '') + 'CCSE.js');
God.name = 'God';
God.version = '1.14';
God.GameVersion = '2.052';

God.launch = function(){
	God.init = function(){
		var iconsURL = 'https://klattmose.github.io/CookieClicker/img/customIcons.png';
		
		CCSE.NewBuilding('God',
			'God|Gods|extracted|[X]% larger event horizon|[X]% larger event horizon',
			'The power of God is on your side',
			1,
			2,
			{
				base:'https://klattmose.github.io/CookieClicker/img/God',
				xV:8,
				yV:32,
				w:128,
				rows:1,
				x:0,
				y:0,
				customBuildingPic:'https://klattmose.github.io/CookieClicker/img/customBuildings.png',
				customIconsPic:iconsURL
			},
			"doesn't matter what you put here",
			function(me){
				var mult = 1;
				mult *= Game.GetTieredCpsMult(me);
				mult *= Game.magicCpS(me.name);
				return me.baseCps * mult;
			},
			function(){
				Game.UnlockTiered(this);
				if(this.amount >= Game.SpecialGrandmaUnlock && Game.Objects['Grandma'].amount > 0) Game.Unlock(this.grandma.name);
			},
			{
				name:'Hypnodrone',
				desc:'Autonomous aerial brand ambassadors to "encourage" more sales!',
				icon:1
			},
			['Kugelblitz', 'Spaghettification']
		);
		
		Game.Objects['God'].displayName='<span style="font-size:80%;position:relative;bottom:4px;">God</span>'; // Shrink the name since it's so large
		
		// Finish up
		God.isLoaded = 1;
		if(God.postloadHooks){
			for(var i = 0; i < God.postloadHooks.length; ++i) God.postloadHooks[i]();
		}
		
		if (Game.prefs.popups) Game.Popup(God.name + ' loaded!');
		else Game.Notify(God.name + ' loaded!', '', '', 1, 1);
	}
	
	
	God.getTieredUpgradeOrder = function(){
		function isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
		
		var res = 0;
		for(var i = 0; i < Game.ObjectsN; i++){
			var me = Game.ObjectsById[i];
			for(var ii in me.tieredUpgrades){
				if(isNumber(ii)) res = Math.max(me.tieredUpgrades[ii].order, res);
			}
		}
		
		return res + 0.01;
	}
	
	God.getGrandmaUpgradeOrder = function(){
		var res = 0;
		for(var i in Game.GrandmaSynergies){
			res = Math.max(Game.Upgrades[Game.GrandmaSynergies[i]].order, res);
		}
		
		return res + 0.01;
	}
	
	God.getSynergyUpgradeOrder = function(){
		var res = 0;
		for(var i = 0; i < Game.ObjectsN; i++){
			var me = Game.ObjectsById[i];
			for(var ii in me.synergies){
				res = Math.max(me.synergies[ii].order, res);
			}
		}
		
		return res + 0.01;
	}
	
	God.getAchievementOrder = function(){
		var res = 0;
		for(var i = 0; i < Game.ObjectsN-1; i++){
			var me = Game.ObjectsById[i];
			
			for(var ii in me.tieredAchievs){
				res = Math.max(me.tieredAchievs[ii].order, res);
			}
			
			for(var ii in me.productionAchievs){
				res = Math.max(me.productionAchievs[ii].achiev.order, res);
			}
			
			if(me.levelAchiev10) res = Math.max(me.levelAchiev10.order, res);
		}
		
		return res + 0.01;
	}
	
	
	ModLanguage('*',{
		
		"%1 God": [
			"%1 God",
			"%1 Gods"
		],
		"[God quote]The power of God is on your side": "The power of God is on your side",
		"[God business name]Hypnodrone": "Hypnodrone",
		'[God business quote]Autonomous aerial brand ambassadors to "encourage" more sales!': 'Autonomous aerial brand ambassadors to "encourage" more sales!',
	});
	
	if(CCSE.ConfirmGameVersion(God.name, God.version, God.GameVersion)) God.init();
}


if(!God.isLoaded){
	if(CCSE && CCSE.isLoaded){
		God.launch();
	}
	else{
		if(!CCSE) var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(God.launch);
	}
}
