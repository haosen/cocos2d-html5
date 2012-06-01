/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var MAX_SPRITES = 1000;
var SPRITES_INCREASE = 50;

var TAG_INFO_LAYER = 1;
var TAG_MAIN_LAYER = 2;
var TAG_SPRITE_MENU_LAYER = (MAX_SPRITES + 1000);

var s_nSpriteCurCase = 0;

////////////////////////////////////////////////////////
//
// SubTest
//
////////////////////////////////////////////////////////
var SubTest = cc.Class.extend({
    _subtestNumber:null,
    _batchNode:null,
    _parent:null,
    removeByTag:function (tag) {
        switch (this._subtestNumber) {
            case 1:
            case 4:
            case 7:
                this._parent.removeChildByTag(tag + 100, true);
                break;
            case 2:
            case 3:
            case 5:
            case 6:
            case 8:
            case 9:
                this._batchNode.removeChildAtIndex(tag, true);
                break;
            default:
                break;
        }
    },
    createSpriteWithTag:function (tag) {
// create
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_RGBA8888);

        var sprite = null;
        switch (this._subtestNumber) {
            case 1:
            {
                sprite = cc.Sprite.spriteWithFile("Resources/Images/grossinis_sister1.png");
                this._parent.addChild(sprite, 0, tag + 100);
                break;
            }
            case 2:
            case 3:
            {
                sprite = cc.Sprite.spriteWithBatchNode(this._batchNode, cc.RectMake(0, 0, 52, 139));
                this._batchNode.addChild(sprite, 0, tag + 100);
                break;
            }
            case 4:
            {
                var idx = parseInt(cc.RANDOM_0_1() * 14) + 1;
                idx = idx < 10 ? "0" + idx : idx.toString();
                var str = "Resources/Images/grossini_dance_" + idx + ".png";
                sprite = cc.Sprite.spriteWithFile(str);
                this._parent.addChild(sprite, 0, tag + 100);
                break;
            }
            case 5:
            case 6:
            {
                var idx = 0 | (cc.RANDOM_0_1() * 14);
                var x = (idx % 5) * 85;
                var y = (0 | (idx / 5)) * 121;
                sprite = cc.Sprite.spriteWithBatchNode(this._batchNode, cc.RectMake(x, y, 85, 121));
                this._batchNode.addChild(sprite, 0, tag + 100);
                break;
            }

            case 7:
            {
                var y, x;
                var r = 0 | (cc.RANDOM_0_1() * 64);

                y = parseInt(r / 8);
                x = parseInt(r % 8);

                var str = "Resources/Images/sprites_test/sprite-" + x + "-" + y + ".png";
                sprite = cc.Sprite.spriteWithFile(str);
                this._parent.addChild(sprite, 0, tag + 100);
                break;
            }

            case 8:
            case 9:
            {
                var y, x;
                var r = 0 | (cc.RANDOM_0_1() * 64);

                y = (0|(r / 8)) *32;
                x = (r % 8)*32;
                sprite = cc.Sprite.spriteWithBatchNode(this._batchNode, cc.RectMake(x, y, 32, 32));
                this._batchNode.addChild(sprite, 0, tag + 100);
                break;
            }

            default:
                break;
        }

        cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_DEFAULT);

        return sprite;
    },
    initWithSubTest:function (subTest, p) {
        this._subtestNumber = subTest;
        this._parent = p;
        this._batchNode = null;
        /*
         * Tests:
         * 1: 1 (32-bit) PNG sprite of 52 x 139
         * 2: 1 (32-bit) PNG Batch Node using 1 sprite of 52 x 139
         * 3: 1 (16-bit) PNG Batch Node using 1 sprite of 52 x 139
         * 4: 1 (4-bit) PVRTC Batch Node using 1 sprite of 52 x 139

         * 5: 14 (32-bit) PNG sprites of 85 x 121 each
         * 6: 14 (32-bit) PNG Batch Node of 85 x 121 each
         * 7: 14 (16-bit) PNG Batch Node of 85 x 121 each
         * 8: 14 (4-bit) PVRTC Batch Node of 85 x 121 each

         * 9: 64 (32-bit) sprites of 32 x 32 each
         *10: 64 (32-bit) PNG Batch Node of 32 x 32 each
         *11: 64 (16-bit) PNG Batch Node of 32 x 32 each
         *12: 64 (4-bit) PVRTC Batch Node of 32 x 32 each
         */

        // purge textures
        var mgr = cc.TextureCache.sharedTextureCache();
        //		[mgr removeAllTextures];
        mgr.removeTexture(mgr.addImage("Resources/Images/grossinis_sister1.png"));
        mgr.removeTexture(mgr.addImage("Resources/Images/grossini_dance_atlas.png"));
        mgr.removeTexture(mgr.addImage("Resources/Images/spritesheet1.png"));

        switch (this._subtestNumber) {
            case 1:
            case 4:
            case 7:
                break;
            ///
            case 2:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_RGBA8888);
                this._batchNode = cc.SpriteBatchNode.batchNodeWithFile("Resources/Images/grossinis_sister1.png", 100);
                p.addChild(this._batchNode, 0);
                break;
            case 3:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_RGBA4444);
                this._batchNode = cc.SpriteBatchNode.batchNodeWithFile("Resources/Images/grossinis_sister1.png", 100);
                p.addChild(this._batchNode, 0);
                break;

            ///
            case 5:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_RGBA8888);
                this._batchNode = cc.SpriteBatchNode.batchNodeWithFile("Resources/Images/grossini_dance_atlas.png", 100);
                p.addChild(this._batchNode, 0);
                break;
            case 6:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_RGBA4444);
                this._batchNode = cc.SpriteBatchNode.batchNodeWithFile("Resources/Images/grossini_dance_atlas.png", 100);
                p.addChild(this._batchNode, 0);
                break;

            ///
            case 8:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_RGBA8888);
                this._batchNode = cc.SpriteBatchNode.batchNodeWithFile("Resources/Images/spritesheet1.png", 100);
                p.addChild(this._batchNode, 0);
                break;
            case 9:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_RGBA4444);
                this._batchNode = cc.SpriteBatchNode.batchNodeWithFile("Resources/Images/spritesheet1.png", 100);
                p.addChild(this._batchNode, 0);
                break;

            default:
                break;
        }

        cc.Texture2D.setDefaultAlphaPixelFormat(cc.CCTEXTURE_2D_PIXEL_FORMAT_DEFAULT);
    }
});

////////////////////////////////////////////////////////
//
// SpriteMenuLayer
//
////////////////////////////////////////////////////////
var SpriteMenuLayer = PerformBasicLayer.extend({
    _maxCases:7,
    showCurrentTest:function () {
        var scene = null;
        var preScene = this.getParent();
        var subTest = preScene.getSubTestNum();
        var nodes = preScene.getNodesNum();

        switch (this._curCase) {
            case 0:
                scene = new SpritePerformTest1();
                break;
            case 1:
                scene = new SpritePerformTest2();
                break;
            case 2:
                scene = new SpritePerformTest3();
                break;
            case 3:
                scene = new SpritePerformTest4();
                break;
            case 4:
                scene = new SpritePerformTest5();
                break;
            case 5:
                scene = new SpritePerformTest6();
                break;
            case 6:
                scene = new SpritePerformTest7();
                break;
        }
        s_nSpriteCurCase = this._curCase;

        if (scene) {
            scene.initWithSubTest(subTest, nodes);
            cc.Director.sharedDirector().replaceScene(scene);
        }
    }
});

////////////////////////////////////////////////////////
//
// SpriteMainScene
//
////////////////////////////////////////////////////////
var SpriteMainScene = cc.Scene.extend({
    _lastRenderedCount:null,
    _quantityNodes:null,
    _subTest:null,
    _subtestNumber:1,
    title:function () {
        return "No title";
    },
    initWithSubTest:function (asubtest, nodes) {
        this._subtestNumber = asubtest;
        this._subTest = new SubTest();
        this._subTest.initWithSubTest(asubtest, this);

        var s = cc.Director.sharedDirector().getWinSize();

        this._lastRenderedCount = 0;
        this._quantityNodes = 0;

        // add title label
        var label = cc.LabelTTF.labelWithString(this.title(), "Arial", 40);
        this.addChild(label, 1);
        label.setPosition(cc.ccp(s.width / 2, s.height - 32));
        label.setColor(cc.ccc3(255, 255, 40));

        cc.MenuItemFont.setFontSize(65);
        var decrease = cc.MenuItemFont.itemFromString(" - ", this, this.onDecrease);
        decrease.setColor(cc.ccc3(0, 200, 20));
        var increase = cc.MenuItemFont.itemFromString(" + ", this, this.onIncrease);
        increase.setColor(cc.ccc3(0, 200, 20));

        var menu = cc.Menu.menuWithItems(decrease, increase, null);
        menu.alignItemsHorizontally();

        menu.setPosition(cc.ccp(s.width / 2, s.height - 65));
        this.addChild(menu, 1);

        var infoLabel = cc.LabelTTF.labelWithString("0 nodes", "Marker Felt", 30);
        infoLabel.setColor(cc.ccc3(0, 200, 20));
        infoLabel.setPosition(cc.ccp(s.width / 2, s.height - 90));
        this.addChild(infoLabel, 1, TAG_INFO_LAYER);

        // add menu
        var menu = new SpriteMenuLayer(true, 7, s_nSpriteCurCase);
        this.addChild(menu, 1, TAG_SPRITE_MENU_LAYER);

        // Sub Tests
        cc.MenuItemFont.setFontSize(32);
        var subMenu = cc.Menu.menuWithItems(null);
        for (var i = 1; i <= 9; ++i) {
            var text = i.toString();
            var itemFont = cc.MenuItemFont.itemFromString(text, this, this.testNCallback);
            itemFont.setTag(i);
            subMenu.addChild(itemFont, 10);

            if (i <= 3)
                itemFont.setColor(cc.ccc3(200, 20, 20));
            else if (i <= 6)
                itemFont.setColor(cc.ccc3(0, 200, 20));
            else
                itemFont.setColor(cc.ccc3(0, 20, 200));
        }

        subMenu.alignItemsHorizontally();
        subMenu.setPosition(cc.ccp(s.width / 2, 80));
        this.addChild(subMenu, 2);

        while (this._quantityNodes < nodes) {
            this.onIncrease(this);
        }
    },
    updateNodes:function () {
        if (this._quantityNodes != this._lastRenderedCount) {
            var infoLabel = this.getChildByTag(TAG_INFO_LAYER);
            var str = this._quantityNodes + " nodes";
            infoLabel.setString(str);

            this._lastRenderedCount = this._quantityNodes;
        }
    },
    testNCallback:function (sender) {
        this._subtestNumber = sender.getTag();
        var menu = this.getChildByTag(TAG_SPRITE_MENU_LAYER);
        menu.restartCallback(sender);
    },
    onIncrease:function (sender) {
        if (this._quantityNodes >= MAX_SPRITES)
            return;

        for (var i = 0; i < SPRITES_INCREASE; i++) {
            var sprite = this._subTest.createSpriteWithTag(this._quantityNodes);
            this.doTest(sprite);
            this._quantityNodes++;
        }

        this.updateNodes();
    },
    onDecrease:function (sender) {
        if (this._quantityNodes <= 0)
            return;

        for (var i = 0; i < SPRITES_INCREASE; i++) {
            this._quantityNodes--;
            this._subTest.removeByTag(this._quantityNodes);
        }

        this.updateNodes();
    },

    doTest:function (sprite) {

    },

    getSubTestNum:function () {
        return this._subtestNumber
    },
    getNodesNum:function () {
        return this._quantityNodes
    }
});


////////////////////////////////////////////////////////
//
// For test functions
//
////////////////////////////////////////////////////////
function performanceActions(sprite) {
    var size = cc.Director.sharedDirector().getWinSize();
    sprite.setPosition(cc.ccp(parseInt(Math.random() * size.width), parseInt(Math.random() * size.height)));

    var period = 0.5 + (Math.random() * 1000) / 500.0;
    var rot = cc.RotateBy.actionWithDuration(period, 360.0 * cc.RANDOM_0_1());
    var rot_back = rot.reverse();
    var permanentRotation = cc.RepeatForever.actionWithAction(cc.Sequence.actions(rot, rot_back, null));
    sprite.runAction(permanentRotation);

    var growDuration = 0.5 + (Math.random() * 1000) / 500.0;
    var grow = cc.ScaleBy.actionWithDuration(growDuration, 0.5, 0.5);
    var permanentScaleLoop = cc.RepeatForever.actionWithAction(cc.Sequence.actionOneTwo(grow, grow.reverse()));
    sprite.runAction(permanentScaleLoop);
}

function performanceActions20(sprite) {
    var size = cc.Director.sharedDirector().getWinSize();
    if (cc.RANDOM_0_1() < 0.2)
        sprite.setPosition(cc.ccp(parseInt(Math.random() * size.width), parseInt(Math.random() * size.height)));
    else
        sprite.setPosition(cc.ccp(-1000, -1000));

    var period = 0.5 + (Math.random() * 1000) / 500.0;
    var rot = cc.RotateBy.actionWithDuration(period, 360.0 * cc.RANDOM_0_1());
    var rot_back = rot.reverse();
    var permanentRotation = cc.RepeatForever.actionWithAction(cc.Sequence.actions(rot, rot_back, null));
    sprite.runAction(permanentRotation);

    var growDuration = 0.5 + (Math.random() * 1000) / 500.0;
    var grow = cc.ScaleBy.actionWithDuration(growDuration, 0.5, 0.5);
    var permanentScaleLoop = cc.RepeatForever.actionWithAction(cc.Sequence.actionOneTwo(grow, grow.reverse()));
    sprite.runAction(permanentScaleLoop);
}

function performanceRotationScale(sprite) {
    var size = cc.Director.sharedDirector().getWinSize();
    sprite.setPosition(cc.ccp(parseInt(Math.random() * size.width), parseInt(Math.random() * size.height)));
    sprite.setRotation(cc.RANDOM_0_1() * 360);
    sprite.setScale(cc.RANDOM_0_1() * 2);
}

function performancePosition(sprite) {
    var size = cc.Director.sharedDirector().getWinSize();
    sprite.setPosition(cc.ccp(parseInt(Math.random() * size.width), parseInt(Math.random() * size.height)));
}

function performanceout20(sprite) {
    var size = cc.Director.sharedDirector().getWinSize();

    if (cc.RANDOM_0_1() < 0.2)
        sprite.setPosition(cc.ccp(parseInt(Math.random() * size.width), parseInt(Math.random() * size.height)));
    else
        sprite.setPosition(cc.ccp(-1000, -1000));
}

function performanceOut100(sprite) {
    sprite.setPosition(cc.ccp(-1000, -1000));
}

function performanceScale(sprite) {
    var size = cc.Director.sharedDirector().getWinSize();
    sprite.setPosition(cc.ccp(parseInt(Math.random() * size.width), parseInt(Math.random() * size.height)));
    sprite.setScale(cc.RANDOM_0_1() * 100 / 50);
}


////////////////////////////////////////////////////////
//
// SpritePerformTest1
//
////////////////////////////////////////////////////////
var SpritePerformTest1 = SpriteMainScene.extend({
    doTest:function (sprite) {
        performancePosition(sprite);
    },
    title:function () {
        return "A (" + this._subtestNumber + ") position";
    }
});

////////////////////////////////////////////////////////
//
// SpritePerformTest2
//
////////////////////////////////////////////////////////
var SpritePerformTest2 = SpriteMainScene.extend({
    doTest:function (sprite) {
        performanceScale(sprite);
    },
    title:function () {
        return "B (" + this._subtestNumber + ") scale";
    }
});

////////////////////////////////////////////////////////
//
// SpritePerformTest3
//
////////////////////////////////////////////////////////
var SpritePerformTest3 = SpriteMainScene.extend({
    doTest:function (sprite) {
        performanceRotationScale(sprite);
    },
    title:function () {
        return "C (" + this._subtestNumber + ") scale + rot";
    }
});

////////////////////////////////////////////////////////
//
// SpritePerformTest4
//
////////////////////////////////////////////////////////
var SpritePerformTest4 = SpriteMainScene.extend({
    doTest:function (sprite) {
        performanceOut100(sprite);
    },
    title:function () {
        return "D (" + this._subtestNumber + ") 100% out";
    }
});

////////////////////////////////////////////////////////
//
// SpritePerformTest5
//
////////////////////////////////////////////////////////
var SpritePerformTest5 = SpriteMainScene.extend({
    doTest:function (sprite) {
        performanceout20(sprite);
    },
    title:function () {
        return "E (" + this._subtestNumber + ") 80% out";
    }
});

////////////////////////////////////////////////////////
//
// SpritePerformTest6
//
////////////////////////////////////////////////////////
var SpritePerformTest6 = SpriteMainScene.extend({
    doTest:function (sprite) {
        performanceActions(sprite);
    },
    title:function () {
        return "F (" + this._subtestNumber + ") actions";
    }
});

////////////////////////////////////////////////////////
//
// SpritePerformTest7
//
////////////////////////////////////////////////////////
var SpritePerformTest7 = SpriteMainScene.extend({
    doTest:function (sprite) {
        performanceActions20(sprite);
    },
    title:function () {
        return "G (" + this._subtestNumber + ") actions 80% out";
    }
});

function runSpriteTest() {
    var scene = new SpritePerformTest1;
    scene.initWithSubTest(1, 50);
    cc.Director.sharedDirector().replaceScene(scene);
}