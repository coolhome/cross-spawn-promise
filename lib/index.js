'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shouldIgnore = function shouldIgnore(value) {
  return value === 'ignore' || value === 'inherit';
};

var parseStdioOption = function parseStdioOption(value) {
  var ignoreStdout = false;
  var ignoreStderr = false;
  if (shouldIgnore(value)) {
    ignoreStdout = true;
    ignoreStderr = true;
  } else if (Array.isArray(value)) {
    ignoreStdout = shouldIgnore(value[1]);
    ignoreStderr = shouldIgnore(value[2]);
  }
  return [ignoreStdout, ignoreStderr];
};

exports.default = function (cmd, args) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  return new Promise(function (resolve, reject) {
    var proc = (0, _crossSpawn2.default)(cmd, args, options);
    var stdout = null;
    var stderr = null;

    var _parseStdioOption = parseStdioOption(options.stdio);

    var _parseStdioOption2 = _slicedToArray(_parseStdioOption, 2);

    var ignoreStdout = _parseStdioOption2[0];
    var ignoreStderr = _parseStdioOption2[1];

    if (!ignoreStdout) {
      stdout = [];
      proc.stdout.on('data', function (data) {
        stdout.push(data);
      });
    }
    if (!ignoreStderr) {
      stderr = [];
      proc.stderr.on('data', function (data) {
        stderr.push(data);
      });
    }
    proc.once('close', function (code) {
      if (code !== 0) {
        var err = new Error('Exited with status ' + code);
        err.exitStatus = code;
        if (!ignoreStderr) {
          err.stderr = Buffer.concat(stderr);
        }
        reject(err);
      } else {
        resolve(ignoreStdout ? null : Buffer.concat(stdout));
      }
    });
    proc.once('error', reject);
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNLGVBQWUsU0FBZixZQUFlLENBQUMsS0FBRDtBQUFBLFNBQVksVUFBVSxRQUFWLElBQXNCLFVBQVUsU0FBNUM7QUFBQSxDQUFyQjs7QUFFQSxJQUFNLG1CQUFtQixTQUFuQixnQkFBbUIsQ0FBQyxLQUFELEVBQVc7QUFDbEMsTUFBSSxlQUFlLEtBQW5CO0FBQ0EsTUFBSSxlQUFlLEtBQW5CO0FBQ0EsTUFBSSxhQUFhLEtBQWIsQ0FBSixFQUF5QjtBQUN2QixtQkFBZSxJQUFmO0FBQ0EsbUJBQWUsSUFBZjtBQUNELEdBSEQsTUFHTyxJQUFJLE1BQU0sT0FBTixDQUFjLEtBQWQsQ0FBSixFQUEwQjtBQUMvQixtQkFBZSxhQUFhLE1BQU0sQ0FBTixDQUFiLENBQWY7QUFDQSxtQkFBZSxhQUFhLE1BQU0sQ0FBTixDQUFiLENBQWY7QUFDRDtBQUNELFNBQU8sQ0FBQyxZQUFELEVBQWUsWUFBZixDQUFQO0FBQ0QsQ0FYRDs7a0JBYWUsVUFBQyxHQUFELEVBQU0sSUFBTjtBQUFBLE1BQVksT0FBWix5REFBc0IsRUFBdEI7QUFBQSxTQUE2QixJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQzNFLFFBQU0sT0FBTywwQkFBVyxHQUFYLEVBQWdCLElBQWhCLEVBQXNCLE9BQXRCLENBQWI7QUFDQSxRQUFJLFNBQVMsSUFBYjtBQUNBLFFBQUksU0FBUyxJQUFiOztBQUgyRSw0QkFJdEMsaUJBQWlCLFFBQVEsS0FBekIsQ0FKc0M7O0FBQUE7O0FBQUEsUUFJcEUsWUFKb0U7QUFBQSxRQUl0RCxZQUpzRDs7QUFLM0UsUUFBSSxDQUFDLFlBQUwsRUFBbUI7QUFDakIsZUFBUyxFQUFUO0FBQ0EsV0FBSyxNQUFMLENBQVksRUFBWixDQUFlLE1BQWYsRUFBdUIsVUFBQyxJQUFELEVBQVU7QUFBRSxlQUFPLElBQVAsQ0FBWSxJQUFaO0FBQW1CLE9BQXREO0FBQ0Q7QUFDRCxRQUFJLENBQUMsWUFBTCxFQUFtQjtBQUNqQixlQUFTLEVBQVQ7QUFDQSxXQUFLLE1BQUwsQ0FBWSxFQUFaLENBQWUsTUFBZixFQUF1QixVQUFDLElBQUQsRUFBVTtBQUFFLGVBQU8sSUFBUCxDQUFZLElBQVo7QUFBbUIsT0FBdEQ7QUFDRDtBQUNELFNBQUssSUFBTCxDQUFVLE9BQVYsRUFBbUIsVUFBQyxJQUFELEVBQVU7QUFDM0IsVUFBSSxTQUFTLENBQWIsRUFBZ0I7QUFDZCxZQUFNLE1BQU0sSUFBSSxLQUFKLHlCQUFnQyxJQUFoQyxDQUFaO0FBQ0EsWUFBSSxVQUFKLEdBQWlCLElBQWpCO0FBQ0EsWUFBSSxDQUFDLFlBQUwsRUFBbUI7QUFDakIsY0FBSSxNQUFKLEdBQWEsT0FBTyxNQUFQLENBQWMsTUFBZCxDQUFiO0FBQ0Q7QUFDRCxlQUFPLEdBQVA7QUFDRCxPQVBELE1BT087QUFDTCxnQkFBUSxlQUFlLElBQWYsR0FBc0IsT0FBTyxNQUFQLENBQWMsTUFBZCxDQUE5QjtBQUNEO0FBQ0YsS0FYRDtBQVlBLFNBQUssSUFBTCxDQUFVLE9BQVYsRUFBbUIsTUFBbkI7QUFDRCxHQTFCMkMsQ0FBN0I7QUFBQSxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBjcm9zc1NwYXduIGZyb20gJ2Nyb3NzLXNwYXduJ1xuXG5jb25zdCBzaG91bGRJZ25vcmUgPSAodmFsdWUpID0+ICh2YWx1ZSA9PT0gJ2lnbm9yZScgfHwgdmFsdWUgPT09ICdpbmhlcml0JylcblxuY29uc3QgcGFyc2VTdGRpb09wdGlvbiA9ICh2YWx1ZSkgPT4ge1xuICBsZXQgaWdub3JlU3Rkb3V0ID0gZmFsc2VcbiAgbGV0IGlnbm9yZVN0ZGVyciA9IGZhbHNlXG4gIGlmIChzaG91bGRJZ25vcmUodmFsdWUpKSB7XG4gICAgaWdub3JlU3Rkb3V0ID0gdHJ1ZVxuICAgIGlnbm9yZVN0ZGVyciA9IHRydWVcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIGlnbm9yZVN0ZG91dCA9IHNob3VsZElnbm9yZSh2YWx1ZVsxXSlcbiAgICBpZ25vcmVTdGRlcnIgPSBzaG91bGRJZ25vcmUodmFsdWVbMl0pXG4gIH1cbiAgcmV0dXJuIFtpZ25vcmVTdGRvdXQsIGlnbm9yZVN0ZGVycl1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKGNtZCwgYXJncywgb3B0aW9ucyA9IHt9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIGNvbnN0IHByb2MgPSBjcm9zc1NwYXduKGNtZCwgYXJncywgb3B0aW9ucylcbiAgbGV0IHN0ZG91dCA9IG51bGxcbiAgbGV0IHN0ZGVyciA9IG51bGxcbiAgY29uc3QgW2lnbm9yZVN0ZG91dCwgaWdub3JlU3RkZXJyXSA9IHBhcnNlU3RkaW9PcHRpb24ob3B0aW9ucy5zdGRpbylcbiAgaWYgKCFpZ25vcmVTdGRvdXQpIHtcbiAgICBzdGRvdXQgPSBbXVxuICAgIHByb2Muc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHsgc3Rkb3V0LnB1c2goZGF0YSkgfSlcbiAgfVxuICBpZiAoIWlnbm9yZVN0ZGVycikge1xuICAgIHN0ZGVyciA9IFtdXG4gICAgcHJvYy5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4geyBzdGRlcnIucHVzaChkYXRhKSB9KVxuICB9XG4gIHByb2Mub25jZSgnY2xvc2UnLCAoY29kZSkgPT4ge1xuICAgIGlmIChjb2RlICE9PSAwKSB7XG4gICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYEV4aXRlZCB3aXRoIHN0YXR1cyAke2NvZGV9YClcbiAgICAgIGVyci5leGl0U3RhdHVzID0gY29kZVxuICAgICAgaWYgKCFpZ25vcmVTdGRlcnIpIHtcbiAgICAgICAgZXJyLnN0ZGVyciA9IEJ1ZmZlci5jb25jYXQoc3RkZXJyKVxuICAgICAgfVxuICAgICAgcmVqZWN0KGVycilcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZShpZ25vcmVTdGRvdXQgPyBudWxsIDogQnVmZmVyLmNvbmNhdChzdGRvdXQpKVxuICAgIH1cbiAgfSlcbiAgcHJvYy5vbmNlKCdlcnJvcicsIHJlamVjdClcbn0pXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
