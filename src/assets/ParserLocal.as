package  {
	
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.display.DisplayObjectContainer;
	import flash.display.DisplayObject;
	import flash.text.TextField;
	
	
	public class ParserLocal extends MovieClip {
		
		private var mainSWF:MovieClip = new MovieClip();
		private var mainMC:MovieClip;
		private var o:Object = {};
		
		public function ParserLocal() {
			mainParsing();
		}

		private function mainParsing():void {
			var rs:Object;
			var mc: MovieClip;
			
			mainMC = this;
			for(var i:int = 0; i < this.numChildren; i++) 
			{
				mc = this.getChildAt(i) as MovieClip;
				if(!mc) continue;	
				if(mc.name.indexOf("_advanced") > -1) {
					rs = advancedParse(mc);
					o[mc.name.replace("_advanced", "")] = rs;
				}
				else
				if(mc.name.indexOf("_object") > -1) {
					rs = multipleParse(mc);
					o[mc.name.replace("_object", "")] = rs;
				}
				else
				if(mc.name.indexOf("_array") > -1) {
					rs = multipleParseInArray(mc);
					o[mc.name.replace("_array", "")] = rs;
				}
				else {
					rs = singleParse(mc);
					o[mc.name] = rs;
				}
			}
			
			var reels:Array = [];
			mc = mainMC.reels;
			for(var j: int = 0; j < mc.numChildren; j++) 
			{
				var reelMulti:Object = multipleParse(mc.getChildAt(j) as DisplayObjectContainer);
				reelMulti = singleParse(mc.getChildAt(j) as DisplayObjectContainer, reelMulti);	
				reels.push(reelMulti);
			}
			rs = singleParse(mc);
			rs[mc.name] = reels;
			o[mc.name] = rs;
			
			var json:String = JSON.stringify(o);
			trace(json);
		}
		
		private function advancedParse(node:DisplayObjectContainer):Object {
			var list:Object = {};
			list.child = [];
			//trace(node.name + " numChildren: " + node.numChildren);

			var child:DisplayObject;
			var resObj:Object;
			for(var i:int = 0; i < node.numChildren; i++) {
				if(!list.hasOwnProperty("child")) {
					list.child = [];
				}
				
				child = node.getChildAt(i);
				if(child.name.indexOf("_advanced") > -1) {
					resObj = advancedParse(child as DisplayObjectContainer);
				} else {
					resObj = singleParse(child);
				}
				resObj.name = resObj.name.replace("_advanced", "");
				list.child.push(resObj);
			}
			singleParse(node, list);
			list.name = list.name.replace("_advanced", "");
			return list;
		}
		
		private function getNodeType(node:DisplayObject):String {
			var type:String = "";
			
			return type;
		}
		
		private function singleParse(node:DisplayObject, res:Object = null):Object {
			if(res == null) {
				res = {}
			}
			
			res.name = node.name;
			res.x = node.x;
			res.y = node.y;
			res.width = node.width;
			res.height = node.height;
			res.scaleX = node.scaleX;
			res.scaleY = node.scaleY;
			res.rotation = node.rotation;
			res.type = getNodeType(node);
			
			if(node is TextField) {
				res.align = (node as TextField).getTextFormat().align;
			}
			
			return res;
		}
		
		private function multipleParse(node:DisplayObjectContainer):Object {
			var list:Object = {};
			var oo:Object;
			//trace(node.name + " numChildren: " + node.numChildren);

			var child:DisplayObject;
			var resObj:Object;
			for(var i:int = 0; i < node.numChildren; i++) {
				child = node.getChildAt(i);
				if(child.name.indexOf("_object") > -1) {
					resObj = multipleParse(child as DisplayObjectContainer);
					resObj.name.replace("_object", "");
					list[resObj.name] = resObj;
				} else {
					resObj = singleParse(child);
					resObj.name.replace("_object", "");
					list[resObj.name] = resObj;
				}
			}
			singleParse(node, list);
			return list;
		}
		
		private function multipleParseInArray(node:DisplayObjectContainer):Array {
			var list:Array = [];
			var oo:Object;
			//trace(node.name + " numChildren: " + node.numChildren);
			
			for(var i:int = 0; i < node.numChildren; i++) {
				var child:DisplayObject = node.getChildAt(i);
				oo = {
					"name": child.name,
					"x":child.x,
					"rotation":child.rotation,
					"y":child.y,
					"width":child.width,
					"height":child.height,
					"rotation":child.rotation
				}

				if(node.getChildAt(i) is TextField) {
					oo.align = (child as TextField).getTextFormat().align;
				}
				
				list.push(oo);
			}
			singleParse(node, list);
			return list;
			
		}
		
		
	}	
}
