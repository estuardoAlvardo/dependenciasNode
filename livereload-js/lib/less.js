(function() {
  var LessPlugin;

  module.exports = LessPlugin = (function() {
    LessPlugin.identifier = 'less';

    LessPlugin.version = '1.0';

    function LessPlugin(window, host) {
      this.window = window;
      this.host = host;
    }

    LessPlugin.prototype.reload = function(path, options) {
      if (this.window.less && this.window.less.refresh) {
        if (path.match(/\.less$/i)) {
          return this.reloadLess(path);
        }
        if (options.originalPath.match(/\.less$/i)) {
          return this.reloadLess(options.originalPath);
        }
      }
      return false;
    };

    LessPlugin.prototype.reloadLess = function(path) {
      var i, len, link, links;
      links = (function() {
        var i, len, ref, results;
        ref = document.getElementsByTagName('link');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          link = ref[i];
          if (link.href && link.rel.match(/^stylesheet\/less$/i) || (link.rel.match(/stylesheet/i) && link.type.match(/^text\/(x-)?less$/i))) {
            results.push(link);
          }
        }
        return results;
      })();
      if (links.length === 0) {
        return false;
      }
      for (i = 0, len = links.length; i < len; i++) {
        link = links[i];
        link.href = this.host.generateCacheBustUrl(link.href);
      }
      this.host.console.log("LiveReload is asking LESS to recompile all stylesheets");
      this.window.less.refresh(true);
      return true;
    };

    LessPlugin.prototype.analyze = function() {
      return {
        disable: !!(this.window.less && this.window.less.refresh)
      };
    };

    return LessPlugin;

  })();

}).call(this);
