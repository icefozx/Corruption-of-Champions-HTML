Areas.Lake = [];

Areas.Lake.explore = function() {
    clearOutput();
    exploration.exploredLake++; //Increment counter
    var choice = [];
    choice[choice.length] = 0; //Generic imps/goblins
    if (gameFlags[RATHAZUL_CAMP] <= 0) choice[choice.length] = 1; //Rathazul
    choice[choice.length] = 2; //Farm or TF Items
    //choice[choice.length] = 3; //Fetish Cultists & Zealots after factory
    choice[choice.length] = 4; //Green Slime & Goo Girl
    //choice[choice.length] = 8;
    choice[choice.length] = 99; //Nothing out of the ordinary
    var select = choice[rand(choice.length)];
    switch(select) {
        case 0: //Goblin and Imp encounters.
            Areas.GenericExploration.genericGobImpEncounters();
            break;
        case 1: //Rathazul if he isn't in your camp.
            RathazulScene.encounterRathazul();
            break;
        case 2: //Attempt to find the farm or find item (Farm not yet implemented)
            if (rand(100) < 40) {
                Areas.Lake.findLakeLoot();
            }
            else {
                Areas.Lake.findLakeLoot(); //This line will be replaced with farm.
            }
            break;
        case 3: //Fetish Cultists and Zealots, encounterable if factory is shut down (Not yet implemented)
            break;
        case 4: //Green Slime or Goo Girl, encounterable if you're at least level 2.
            var gooOrSlime = 50;
            if (rand(100) < gooOrSlime) //GOO!
                GooGirlScene.encounterGooGirl();
            else //OOZE!
                GreenSlimeScene.encounterSlime();
            break;
        default:
            if (rand(2) == 0) {
                outputText("Your quick walk along the lakeshore feels good.");
                if (player.spe < 50) {
                    outputText(" You bet you could cover the same distance even faster next time.<br>");
                    player.modStats("spe", 0.75);
                }
            }
            else {
                outputText("Your stroll around the lake increasingly bores you, leaving your mind to wander. ");
                if (player.cor > 30 || player.lust > 50 + rand(50) || player.lib > 40) {
                    outputText("Your imaginings increasingly seem to turn ");
                    if ((player.cor > 30 && player.cor < 60) || (player.lust > 50 && player.lust < 90) || (player.lib > 40 && player.lib < 75)) {
                        outputText("to thoughts of sex. ");
                        player.changeLust(5 + (player.lib / 10), true);
                    }
                    if (player.cor >= 60 || player.lust >= 90 || player.lib >= 75) {
                        outputText("into daydreams of raunchy perverted sex, flooding your groin with warmth. ");
                        player.changeLust((player.cor / 10) + (player.lib / 10), true);
                    }
                }
                else {
                    player.modStats("int", 1);
                }
            }
            doNext(Camp.returnToCampUseOneHour);
    }

}

Areas.Lake.findLakeLoot = function() {
    var item;
    switch(rand(3)) {
        case 0:
            outputText("You find a long and oddly flared vial half-buried in the sand. Written across the middle band of the vial is a single word: 'Equinum'.<br>");
            item = Items.Consumables.Equinum;
            break;
        case 1:
            outputText("You find an odd, fruit-bearing tree growing near the lake shore. One of the fruits has fallen on the ground in front of you. You pick it up.<br>");
            item = Items.Consumables.WhiskerFruit;
            break;
        case 2:
            outputText("You find a small clay jar half-buried in the sand. Written across the jar is a single word: 'Hummanus'.<br>");
            item = Items.Consumables.Hummanus;
        default:
            item = Items.Consumables.Equinum;
    }
    Inventory.takeItem(item, Camp.returnToCampUseOneHour);
}