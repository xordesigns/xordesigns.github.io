<template>
    <div class="info centered">
        <h1>SET INFO</h1>
        
        <h3 id="welcome">Welcome to the Far Rim</h3>
        
        <p><b>Quasar</b> is a large set designed for both limited and constructed, meant to be played in isolation. This means that it isn't developed with cross-set compatibility in mind, which allows better exploration of the design space of the mechanics, without having to worry about potentially breaking the format.</p>
        
        <h3>GENERAL</h3>
        
        <p>The main mechanical focus of the set are activated abilities. This is best represented by Sync (one of the set's two core mechanics), though most permanents in the set have some sort of activated ability, whether it's a single-use tap ability or a repeatable mana sink.</p>
        <p>The set is intended to be a standalone environment, with a power level similar to pre-Kaladesh MtG. As far as the gameplay identities of the colors, QSR goes with strategies that are in-color, but are seldom used. In WUBRG order, the color archetypes are as follows:</p>
        
        <ul id="color-list">
            <li><i class="ms ms-w ms-cost ms-shadow"></i> goes tall, focusing on a small number of strong threats to punch through the enemy's forces.</li>
            <li><i class="ms ms-u ms-cost ms-shadow"></i> is evasive aggro, using most dirty tricks in the book to ensure that damage gets through.</li>
            <li><i class="ms ms-b ms-cost ms-shadow"></i> refuses to stay down, bringing its forces back from the dead to fight (and die) again and again.</li>
            <li><i class="ms ms-r ms-cost ms-shadow"></i> is the dedicated ramp color of the set, using bursts of temporary mana to bring out the big guns as early as possible.</li>
            <li><i class="ms ms-g ms-cost ms-shadow"></i> goes wide, swarming the battlefield with its Droid armies, completely overwhelming your opponents' defenses.</li>
        </ul>

        <h3>MECHANICS</h3>

        <p>The set has 2 main mechanics: <b>Sync</b> and <b>Levelers</b>. Sync represents the coordination between the forces fighting on the galactic battlefield, while the leveler cards depict the constant escalation of firepower as the war drags on. Both mechanics are equally represented between the 5 colors, as well as the colorless cards.</p>
        
        <p>
            <img src="../assets/sync1.png">
            <img src="../assets/sync2.png">
        </p>
        <p>
            <img src="../assets/level1.png">
            <img src="../assets/level2.png">
        </p>

        <h3>FLAVOR &amp; STYLE</h3>

        <p>QSR tells the story of a galactic war, where 5 factions fight for control over the titular quasar. In-set, each card that belongs to one of the factions has its faction's respective watermark. The set also has a few nonstandard stylistic choices, such as: Bolded and capitalized keywords when on a standalone line, bordered mana symbols, the addition of 'nonmana' as shorthand wording etc. And, to top it all off, due to the set's nontraditional sci-fi flavor, it features a new set of card frames, designed to better fit the setting. The frames also have a Sync variant, to make it easier to spot cards with the ability at a glance. The set's story is additionaly told through story articles, which can be found here.</p>

        <h3>SET TEASER</h3>

        <p>Some things you can expect in <b>QSR</b>:</p>
        <ul>
            <li>The return of a mechanic with a functionally-unique card template</li>
            <li>A green card with the text "...deals combat damage to a player, create that many..."</li>
            <li>Triple digits in rules text</li>
            <li>A black creature that's a throwback to a very angry Dredge staple</li>
            <li>"Add <i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i><i class="ms ms-r ms-cost ms-shadow"></i>"</li>
            <li>A legendary Xeno Pirate</li>
            <li>A couple Mercenaries</li>
            <li>At least five Droid Giants</li>
            <li>A mono-red mana dork</li>
            <li>Rare reminder text that was last printed on a card from original Mirrodin block</li>
            <li>Spellskite's distant cousin</li>
            <li>Boonweaver Giant's long lost (metallic) twin brother</li>
            <li>A green Oblivion-Ring style effect</li>
            <li>"...except it’s a 4/4 black Droid Zombie artifact creature with menace..."</li>
        </ul>

        <h3>STATS</h3>
        <ul>
            <li><b>No. of cards:</b> 275 (110 common/85 uncommon/50 rare/15 mythic/15 basic lands)</li>
            <li><b>Set Code:</b> QSR</li>
            <li><b>Average CMC:</b> 3.11</li>
            <li><b>Max CMC:</b> 9 (Absolus)</li>
            <li><b>Average power:</b> 3.04</li>
            <li><b>Average toughness:</b> 2.83</li>
            <li><b>Max power:</b> 10 (Starhunter Wurm)</li>
            <li><b>Max toughness:</b> 10 (Starhunter Wurm)</li>
            <li><b>No. of tokens:</b> 3 (not counting variants)</li>
            <li><b>Set mascot:</b> Kuen, [NULL] Vessel</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'SetInfo'
    }
</script>

<style scoped>
    #welcome{
        color: #444;
        font-weight:normal;
    }
    #color-list{
        list-style-type: none;
    }
    #color-list li{
        line-height: 1.5;
    }
</style>