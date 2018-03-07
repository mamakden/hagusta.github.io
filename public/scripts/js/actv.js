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
      };var element = document.getElementById("df7b1f36-b1d6-4ccd-8825-e83dd1f7a7c5");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid 'df7b1f36-b1d6-4ccd-8825-e83dd1f7a7c5' but no matching script tag was found. ")
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
                var docs_json = {"5ce15773-ebe8-4d5b-90b5-3b520a9554d3":{"roots":{"references":[{"attributes":{"data_source":{"id":"82298c64-d617-4e0d-b877-d3d18362ac38","type":"ColumnDataSource"},"glyph":{"id":"71bd370b-fd6c-4562-9cc8-d956aac685ba","type":"Text"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"9d8bb1df-44b0-4b97-97b1-05cfeec79372","type":"GlyphRenderer"},{"attributes":{"data_source":{"id":"b1c0caef-2e0a-4c6e-8483-5e41d2653b79","type":"ColumnDataSource"},"glyph":{"id":"a4e59d77-7040-4d77-8407-ae90f756f283","type":"AnnularWedge"},"hover_glyph":null,"nonselection_glyph":null,"selection_glyph":null},"id":"584e5a23-b1fe-4007-bf79-e7c61af8385f","type":"GlyphRenderer"},{"attributes":{"location":"top_left","plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"1b4d711b-a2aa-41d7-a336-a89928d5fbd9","type":"Legend"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"43edb9ce-4711-4465-97f1-0f84b45dff28","type":"WheelZoomTool"},{"attributes":{},"id":"4a985bf7-5653-4ea5-98fe-f67cdf1b698f","type":"BasicTickFormatter"},{"attributes":{"background_fill_alpha":{"value":0},"below":[{"id":"16fc1307-8865-4376-a894-deb12bd9a692","type":"LinearAxis"}],"border_fill_color":{"value":null},"css_classes":null,"left":[{"id":"3f811f0e-adcf-41b9-b1f4-8e6be89ab61e","type":"LinearAxis"}],"outline_line_color":{"value":null},"plot_height":250,"plot_width":250,"renderers":[{"id":"3de27e9d-d46d-4c26-b23b-1ffc14b180f1","type":"BoxAnnotation"},{"id":"584e5a23-b1fe-4007-bf79-e7c61af8385f","type":"GlyphRenderer"},{"id":"9d8bb1df-44b0-4b97-97b1-05cfeec79372","type":"GlyphRenderer"},{"id":"1b4d711b-a2aa-41d7-a336-a89928d5fbd9","type":"Legend"},{"id":"16fc1307-8865-4376-a894-deb12bd9a692","type":"LinearAxis"},{"id":"3f811f0e-adcf-41b9-b1f4-8e6be89ab61e","type":"LinearAxis"}],"sizing_mode":"scale_width","title":{"id":"898b8681-7c1d-4175-be6d-9f02e64af019","type":"Title"},"tool_events":{"id":"a0d87dd2-cac8-4caa-af02-285f2153781b","type":"ToolEvents"},"toolbar":{"id":"76cf5c50-a5fe-4d6f-9ca2-cc20ffd7a94c","type":"Toolbar"},"toolbar_location":null,"x_mapper_type":"auto","x_range":{"id":"d3527c70-0f86-4441-9a18-1afe6dcbc6c5","type":"Range1d"},"y_mapper_type":"auto","y_range":{"id":"7d461a60-6e57-4711-bc18-17861d6136cb","type":"Range1d"}},"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"},{"attributes":{"axis_label":null,"formatter":{"id":"f03f5afa-a388-43ef-9c80-933b11241074","type":"BasicTickFormatter"},"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"},"ticker":{"id":"aac6891b-23d1-42f3-976c-cd0323f7c3fa","type":"BasicTicker"},"visible":false},"id":"16fc1307-8865-4376-a894-deb12bd9a692","type":"LinearAxis"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"d3527c70-0f86-4441-9a18-1afe6dcbc6c5","type":"Range1d"},{"attributes":{"active_drag":"auto","active_scroll":"auto","active_tap":"auto","tools":[{"id":"32e9a3e9-7954-4aa5-8203-5928fff8d6b7","type":"PanTool"},{"id":"43edb9ce-4711-4465-97f1-0f84b45dff28","type":"WheelZoomTool"},{"id":"88bcbe9a-545c-4587-92c7-b672e2ee5e4b","type":"BoxZoomTool"},{"id":"674cd3a8-1369-41b3-8a40-e451fc9f74eb","type":"SaveTool"},{"id":"9247e73a-2dda-4ce2-9697-01c5ff96fdac","type":"ResetTool"},{"id":"422ef763-c860-4530-9e39-8521a8f89afe","type":"HelpTool"}]},"id":"76cf5c50-a5fe-4d6f-9ca2-cc20ffd7a94c","type":"Toolbar"},{"attributes":{"callback":null,"column_names":["text_angle","x","y","text"],"data":{"text":["design","development","managing","planning","troubleshoot"],"text_angle":{"__ndarray__":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==","dtype":"float64","shape":[5]},"x":[0.9464102244350788,-0.16010419305744564,-1.0794295953163096,-0.46734188962712303,0.9464102244350788],"y":[0.6082209196375472,1.1135491221160494,0.3169491264466084,-1.0233359947738327,-0.6082209196375471]}},"id":"82298c64-d617-4e0d-b877-d3d18362ac38","type":"ColumnDataSource"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"32e9a3e9-7954-4aa5-8203-5928fff8d6b7","type":"PanTool"},{"attributes":{"overlay":{"id":"3de27e9d-d46d-4c26-b23b-1ffc14b180f1","type":"BoxAnnotation"},"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"88bcbe9a-545c-4587-92c7-b672e2ee5e4b","type":"BoxZoomTool"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"9247e73a-2dda-4ce2-9697-01c5ff96fdac","type":"ResetTool"},{"attributes":{"axis_label":null,"formatter":{"id":"4a985bf7-5653-4ea5-98fe-f67cdf1b698f","type":"BasicTickFormatter"},"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"},"ticker":{"id":"33d77ccf-644e-4d25-92e1-ef419f49e4f4","type":"BasicTicker"},"visible":false},"id":"3f811f0e-adcf-41b9-b1f4-8e6be89ab61e","type":"LinearAxis"},{"attributes":{},"id":"aac6891b-23d1-42f3-976c-cd0323f7c3fa","type":"BasicTicker"},{"attributes":{"angle":{"field":"text_angle","units":"rad"},"text_align":"center","text_baseline":"middle","text_font_size":{"value":"10px"},"x":{"field":"x"},"y":{"field":"y"}},"id":"71bd370b-fd6c-4562-9cc8-d956aac685ba","type":"Text"},{"attributes":{},"id":"f03f5afa-a388-43ef-9c80-933b11241074","type":"BasicTickFormatter"},{"attributes":{},"id":"33d77ccf-644e-4d25-92e1-ef419f49e4f4","type":"BasicTicker"},{"attributes":{},"id":"a0d87dd2-cac8-4caa-af02-285f2153781b","type":"ToolEvents"},{"attributes":{"end_angle":{"field":"end","units":"rad"},"fill_alpha":{"value":0.8},"fill_color":{"field":"color"},"inner_radius":{"field":"inners","units":"data"},"line_color":{"value":"White"},"outer_radius":{"field":"outers","units":"data"},"start_angle":{"field":"start","units":"rad"},"x":{"value":0},"y":{"value":0}},"id":"a4e59d77-7040-4d77-8407-ae90f756f283","type":"AnnularWedge"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"674cd3a8-1369-41b3-8a40-e451fc9f74eb","type":"SaveTool"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"3de27e9d-d46d-4c26-b23b-1ffc14b180f1","type":"BoxAnnotation"},{"attributes":{"callback":null,"end":1.6500000000000001,"start":-1.6500000000000001},"id":"7d461a60-6e57-4711-bc18-17861d6136cb","type":"Range1d"},{"attributes":{"plot":{"id":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde","subtype":"Chart","type":"Plot"}},"id":"422ef763-c860-4530-9e39-8521a8f89afe","type":"HelpTool"},{"attributes":{"callback":null,"column_names":["color","start","values","outers","end","centers","activity","level","inners"],"data":{"activity":["design","development","managing","planning","troubleshoot"],"centers":[1.125,1.125,1.125,1.125,1.125],"color":["#f5eef6","#eae6f1","#dbdaeb","#cacee5","#b4c4df"],"end":[1.1423973285781066,2.284794657156213,3.4271919857343196,5.140787978601479,6.283185307179586],"inners":[0.0,0.0,0.0,0.0,0.0],"level":[0.0,0.0,0.0,0.0,0.0],"outers":[1.5,1.5,1.5,1.5,1.5],"start":[0.0,1.1423973285781066,2.284794657156213,3.4271919857343196,5.140787978601479],"values":[0.2,0.2,0.2,0.3,0.2]}},"id":"b1c0caef-2e0a-4c6e-8483-5e41d2653b79","type":"ColumnDataSource"},{"attributes":{"align":"center","plot":null,"text":"Top 5 Activities","text_font_size":{"value":"12px"}},"id":"898b8681-7c1d-4175-be6d-9f02e64af019","type":"Title"}],"root_ids":["0a87729d-aa3c-48c8-bd95-c27ffd6dedde"]},"title":"Bokeh Application","version":"0.12.4"}};
                var render_items = [{"docid":"5ce15773-ebe8-4d5b-90b5-3b520a9554d3","elementid":"df7b1f36-b1d6-4ccd-8825-e83dd1f7a7c5","modelid":"0a87729d-aa3c-48c8-bd95-c27ffd6dedde"}];
                
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
