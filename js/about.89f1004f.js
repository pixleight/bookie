(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"26d3":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-card",[s("v-form",{ref:"form",model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-card-title",{staticClass:"headline grey lighten-3"},[t._v("\n              Settings\n            ")]),s("v-card-text",[s("v-container",[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{label:"Sponsorship",type:"number",prefix:"$",min:"0",rules:t.sponsorshipRules,required:""},model:{value:t.settings.sponsorship,callback:function(e){t.$set(t.settings,"sponsorship",t._n(e))},expression:"settings.sponsorship"}})],1),s("v-flex",{attrs:{xs6:""}},[s("v-text-field",{attrs:{label:"Minimum Bid",type:"number",prefix:"$",min:"0",rules:t.ownerRules,required:""},model:{value:t.settings.minimumBid,callback:function(e){t.$set(t.settings,"minimumBid",t._n(e))},expression:"settings.minimumBid"}})],1),s("v-flex",{attrs:{xs4:""}},[s("v-text-field",{attrs:{label:"Sponsor Cut",type:"number",suffix:"%",rules:t.cutsRules,min:"0",max:"100",required:""},on:{input:t.validate},model:{value:t.settings.cuts.sponsor,callback:function(e){t.$set(t.settings.cuts,"sponsor",t._n(e))},expression:"settings.cuts.sponsor"}})],1),s("v-flex",{attrs:{xs4:""}},[s("v-text-field",{attrs:{label:"Owner Cut",type:"number",suffix:"%",min:"0",max:"100",rules:t.cutsRules,required:""},on:{input:t.validate},model:{value:t.settings.cuts.owner,callback:function(e){t.$set(t.settings.cuts,"owner",t._n(e))},expression:"settings.cuts.owner"}})],1),s("v-flex",{attrs:{xs4:""}},[s("v-text-field",{attrs:{label:"Shriners Cut",type:"number",suffix:"%",min:"0",max:"100",rules:t.cutsRules,required:""},on:{input:t.validate},model:{value:t.settings.cuts.charity,callback:function(e){t.$set(t.settings.cuts,"charity",t._n(e))},expression:"settings.cuts.charity"}})],1)],1)],1)],1),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{disabled:!t.valid,color:"success"},on:{click:t.saveSettings}},[t._v("\n                Save Settings\n              ")])],1)],1)],1)],1),s("v-flex",[s("v-dialog",{attrs:{persistent:"","max-width":"600"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[s("v-btn",t._g({attrs:{block:"",color:"red darken-2",dark:""}},n),[t._v("Reset App")])]}}]),model:{value:t.resetDialog,callback:function(e){t.resetDialog=e},expression:"resetDialog"}},[s("v-card",[s("v-card-title",{staticClass:"headline"},[t._v("Reset?")]),s("v-card-text",[t._v("Are you sure you would like to remove all the bids and reset the app to its initial state?")]),s("v-card-actions",[s("v-spacer"),s("v-btn",{attrs:{color:"grey darken-1",text:""},on:{click:function(e){t.resetDialog=!1}}},[t._v("Cancel")]),s("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:t.resetApp}},[t._v("Reset")])],1)],1)],1)],1)],1)],1)},r=[],i=(s("8e6e"),s("ac6a"),s("456d"),s("bd86")),a=s("2f62");function o(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),s.push.apply(s,n)}return s}function c(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?o(s,!0).forEach(function(e){Object(i["a"])(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):o(s).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}var l={name:"Settings",data:function(){var t=this;return{resetDialog:!1,valid:!1,sponsorshipRules:[function(t){return!!t||"Please enter the cost of a sponsorship"}],ownerRules:[function(t){return!!t||"Please enter the minimum bid for ownership"}],cutsRules:[function(){return t.settings.cuts.sponsor+t.settings.cuts.owner+t.settings.cuts.charity===100||"Cuts must add up to 100%"}]}},computed:c({},Object(a["e"])(["settings"])),methods:c({},Object(a["d"])(["setSnack"]),{saveSettings:function(){var t=this;this.$store.dispatch("saveSettings",this.settings).then(function(){t.setSnack("Settings saved")})},validate:function(){this.$refs.form.validate()},reset:function(){this.$refs.form.reset()},resetApp:function(){var t=this;this.$store.dispatch("resetApp").then(function(){t.resetDialog=!1}).then(function(){t.setSnack("Reset successfully")})}})},u=l,d=s("2877"),p=s("6544"),v=s.n(p),f=s("8336"),b=s("b0af"),m=s("99d9"),g=s("a523"),x=s("169a"),h=s("0e8f"),y=s("4bd4"),w=s("a722"),k=s("2fa4"),O=s("8654"),S=Object(d["a"])(u,n,r,!1,null,"bc9565e0",null);e["default"]=S.exports;v()(S,{VBtn:f["a"],VCard:b["a"],VCardActions:m["a"],VCardText:m["b"],VCardTitle:m["c"],VContainer:g["a"],VDialog:x["a"],VFlex:h["a"],VForm:y["a"],VLayout:w["a"],VSpacer:k["a"],VTextField:O["a"]})}}]);
//# sourceMappingURL=about.89f1004f.js.map