(function() {
  var fn = function() {
    
    (function(global) {
      function now() {
        return new Date();
      }
    
      var force = false;
    
      if (typeof (window._bokeh_onload_callbacks) === "undefined" || force === true) {
        window._bokeh_onload_callbacks = [];
        window._bokeh_is_loading = undefined;
      }
    
    
      
      
    
      function run_callbacks() {
        window._bokeh_onload_callbacks.forEach(function(callback) { callback() });
        delete window._bokeh_onload_callbacks
        console.info("Bokeh: all callbacks have finished");
      }
    
      function load_libs(js_urls, callback) {
        window._bokeh_onload_callbacks.push(callback);
        if (window._bokeh_is_loading > 0) {
          console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        window._bokeh_is_loading = js_urls.length;
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var s = document.createElement('script');
          s.src = url;
          s.async = false;
          s.onreadystatechange = s.onload = function() {
            window._bokeh_is_loading--;
            if (window._bokeh_is_loading === 0) {
              console.log("Bokeh: all BokehJS libraries loaded");
              run_callbacks()
            }
          };
          s.onerror = function() {
            console.warn("failed to load library " + url);
          };
          console.log("Bokeh: injecting script tag for BokehJS library: ", url);
          document.getElementsByTagName("head")[0].appendChild(s);
        }
      };var element = document.getElementById("55c519b5-2dd7-4d32-9a69-b33f90e97e3d");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '55c519b5-2dd7-4d32-9a69-b33f90e97e3d' but no matching script tag was found. ")
        return false;
      }
    
      var js_urls = ["https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.js", "https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.js"];
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          (function() {
            var fn = function() {
              Bokeh.safely(function() {
                var docs_json = {"f7cccfb3-d161-4f7e-aaa0-7865c2e1ae4a":{"roots":{"references":[{"attributes":{},"id":"bceb0eda-529e-4fd4-a225-6630688a4474","type":"BasicTickFormatter"},{"attributes":{"callback":null,"column_names":["color","centers","inners","outers","end","start","values","level","tech"],"data":{"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[2.6101979062091716,4.286099156377629,4.6981923458167625,5.878732564811962,6.283185307179588],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"start":[0.0,2.6101979062091716,4.286099156377629,4.6981923458167625,5.878732564811962],"tech":["Ab-Initio","Cisco CC","Genesys CC","Oracle","Virtual Basic "],"values":[0.9048570195499789,0.5809716599190281,0.14285714285714285,0.4092487015937679,0.14020848845867467]}},"id":"d5406ca5-ea96-4463-b83b-20c7e7d83602","type":"ColumnDataSource"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"52fc687c-eb75-499e-a826-f215da2dda2a","type":"PanTool"},{"id":"2698c1db-ba20-4922-8f58-35b2df78ea5a","type":"WheelZoomTool"},{"id":"62f0000a-c3df-407a-84cc-d9c11f72c6cb","type":"BoxZoomTool"},{"id":"796cda64-88da-472f-abf5-dde0aa8bb431","type":"SaveTool"},{"id":"0fc524a1-737c-4460-8156-13a5294f36e9","type":"ResetTool"},{"id":"ef085277-0551-47d8-b13b-db8ceac7765d","type":"HelpTool"}]},"id":"6786dc7c-806e-4283-935a-8848130205b2","type":"Toolbar"},{"attributes":{"axis_label":null,"formatter":{"id":"bceb0eda-529e-4fd4-a225-6630688a4474","type":"BasicTickFormatter"},"plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"},"ticker":{"id":"1e16c583-b59d-4302-91fe-5aa1e0e3e3ad","type":"BasicTicker"},"visible":false},"id":"536377be-9347-484b-bc51-eda3d7040ebd","type":"LinearAxis"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"1f583e6b-ed57-43ba-bfa7-9e64d1eefd94","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"536377be-9347-484b-bc51-eda3d7040ebd","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"bc1481d4-4264-4e4a-a778-a74f396f9c97","type":"BoxAnnotation"},{"id":"eb926e89-0f71-41b4-86a2-a7fc6db2f50c","type":"GlyphRenderer"},{"id":"cd54daba-ff52-4455-b764-99f5bf314cb0","type":"GlyphRenderer"},{"id":"538a8359-1261-4262-9050-bdf9b985527f","type":"Legend"},{"id":"1f583e6b-ed57-43ba-bfa7-9e64d1eefd94","type":"LinearAxis"},{"id":"536377be-9347-484b-bc51-eda3d7040ebd","type":"LinearAxis"}],"sizing_mode":"scale_width","title":{"id":"13dc2843-f3f8-4b9c-a0ed-5ddf5bbf8ea9","type":"Title"},"tool_events":{"id":"c2d84695-85e3-45b1-870d-56bd96889b0b","type":"ToolEvents"},"toolbar":{"id":"6786dc7c-806e-4283-935a-8848130205b2","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"0d81349a-561c-4e26-8297-510b427a34db","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"ea3f3328-95a4-46dc-a5c2-be8a84cc7079","type":"Range1d"}},"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"},{"attributes":{"overlay":{"id":"bc1481d4-4264-4e4a-a778-a74f396f9c97","type":"BoxAnnotation"},"plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"}},"id":"62f0000a-c3df-407a-84cc-d9c11f72c6cb","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"}},"id":"2698c1db-ba20-4922-8f58-35b2df78ea5a","type":"WheelZoomTool"},{"attributes":{"data_source":{"id":"a39bcfc1-db48-4bcf-b7d0-3048a49a69fd","type":"ColumnDataSource"},"glyph":{"id":"616dde00-9fe8-4896-8151-994877ac6575","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"cd54daba-ff52-4455-b764-99f5bf314cb0","type":"GlyphRenderer"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"8pt"},"x":{"field":"x"},"y":{"field":"y"}},"id":"616dde00-9fe8-4896-8151-994877ac6575","type":"Text"},{"attributes":{"plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"}},"id":"796cda64-88da-472f-abf5-dde0aa8bb431","type":"SaveTool"},{"attributes":{},"id":"45558482-2b97-4b62-987c-c8ce7ac03c15","type":"BasicTicker"},{"attributes":{},"id":"2fdac210-9bf9-4d01-8b34-65e3d37e3aac","type":"BasicTickFormatter"},{"attributes":{"axis_label":null,"formatter":{"id":"2fdac210-9bf9-4d01-8b34-65e3d37e3aac","type":"BasicTickFormatter"},"plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"},"ticker":{"id":"45558482-2b97-4b62-987c-c8ce7ac03c15","type":"BasicTicker"},"visible":false},"id":"1f583e6b-ed57-43ba-bfa7-9e64d1eefd94","type":"LinearAxis"},{"attributes":{},"id":"c2d84695-85e3-45b1-870d-56bd96889b0b","type":"ToolEvents"},{"attributes":{"data_source":{"id":"d5406ca5-ea96-4463-b83b-20c7e7d83602","type":"ColumnDataSource"},"glyph":{"id":"5283165d-00af-405f-a987-ca7335ef87ac","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"eb926e89-0f71-41b4-86a2-a7fc6db2f50c","type":"GlyphRenderer"},{"attributes":{"plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"}},"id":"52fc687c-eb75-499e-a826-f215da2dda2a","type":"PanTool"},{"attributes":{"callback":null,"column_names":["text_angle","x","y","text"],"data":{"text":["Ab-Initio","Cisco CC","Genesys CC","Oracle","Virtual Basic "],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[0.29540501384245865,-1.072550901133706,-0.24577535639757545,0.6128272451980095,1.1020745672689691],"y":[1.0855233197848568,-0.33949899039213,-1.0978248832066273,-0.9434340292479485,-0.22595718218041738]}},"id":"a39bcfc1-db48-4bcf-b7d0-3048a49a69fd","type":"ColumnDataSource"},{"attributes":{},"id":"1e16c583-b59d-4302-91fe-5aa1e0e3e3ad","type":"BasicTicker"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"ea3f3328-95a4-46dc-a5c2-be8a84cc7079","type":"Range1d"},{"attributes":{"location":"top_left","plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"}},"id":"538a8359-1261-4262-9050-bdf9b985527f","type":"Legend"},{"attributes":{"plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"}},"id":"ef085277-0551-47d8-b13b-db8ceac7765d","type":"HelpTool"},{"attributes":{"plot":{"id":"de6ea744-d840-4561-a35b-69d4f0727932","subtype":"Chart","type":"Plot"}},"id":"0fc524a1-737c-4460-8156-13a5294f36e9","type":"ResetTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"bc1481d4-4264-4e4a-a778-a74f396f9c97","type":"BoxAnnotation"},{"attributes":{"align":"center","plot":null,"text":"Top 5 Technology","text_font_size":{"value":"15px"}},"id":"13dc2843-f3f8-4b9c-a0ed-5ddf5bbf8ea9","type":"Title"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"0d81349a-561c-4e26-8297-510b427a34db","type":"Range1d"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"5283165d-00af-405f-a987-ca7335ef87ac","type":"AnnularWedge"}],"root_ids":["de6ea744-d840-4561-a35b-69d4f0727932"]},"title":"Bokeh Application","version":"0.12.4"}};
                var render_items = [{"docid":"f7cccfb3-d161-4f7e-aaa0-7865c2e1ae4a","elementid":"55c519b5-2dd7-4d32-9a69-b33f90e97e3d","modelid":"de6ea744-d840-4561-a35b-69d4f0727932"}];
                
                Bokeh.embed.embed_items(docs_json, render_items);
              });
            };
            if (document.readyState != "loading") fn();
            else document.addEventListener("DOMContentLoaded", fn);
          })();
        },
        function(Bokeh) {
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-0.12.4.min.css");
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-widgets-0.12.4.min.css");
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i](window.Bokeh);
        }
        
      }
    
      if (window._bokeh_is_loading === 0) {
        console.log("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(js_urls, function() {
          console.log("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(this));
  };
  if (document.readyState != "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
})();
