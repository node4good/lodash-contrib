module.exports = function (_) {
  /**
   * Lodash mixins for combinatorics
   * Inspired by python itertools: https://docs.python.org/2.7/library/itertools.html
   *
   * Usage:
   *   permutations([0,1,2],2)                 // [[0,1],[0,2],[1,0],[1,2],[2,0],[2,1]]
   *   combinations([0,1,2],2)                 // [[0,1],[0,2],[1,2]]
   *   combinations_with_replacement([0,1,2],2)// [[0,0],[0,1],[0,2],[1,1],[1,2],[2,2]]
   *   product([0,1,2],[0,1,2])                // [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]
   *
   * Multiple input types:
   *   product('me','hi')
   *   product({who:['me','you'],say:['hi','by']})
   *   product(['me','you'],['hi','by'])
   *   product(['me','hi'])
   *   combinations([0,1,2,3],2)
   *   permutations([1,2,3],2)
   *   permutations('cat',2)
   */

  
  /**
   * Generate all combination of arguments when given arrays or strings
   * e.g. [['Ben','Jade','Darren'],['Smith','Miller']] to [['Ben','Smith'],[..]]
   * e.g. 'the','cat' to [['t', 'c'],['t', 'a'], ...]
  **/
  function _cartesianProductOf(args) {
      if (arguments.length>1) args=_.toArray(arguments);

      // strings to arrays of letters
      args=_.map(args, opt=>typeof opt==='string'?_.toArray(opt):opt)

      return _.reduce(args, function(a, b) {
          return _.flatten(_.map(a, function(x) {
              return _.map(b, function (y) {
                  return _.cat(x,[y]);
              });
          }), false);
      }, [ [] ]);
  }

  /** Generate all combination of arguments from objects
    *  {Object} opts    - An object or arrays with keys describing options  {firstName:['Ben','Jade','Darren'],lastName:['Smith','Miller']}
    *  {Array}        - An array of objects e.g. [{firstName:'Ben',LastName:'Smith'},{..]
    **/
  function _cartesianProductObj(optObj){
      var keys = _.keys(optObj);
      var opts = _.values(optObj);
      var combs = _cartesianProductOf(opts);
      return _.map(combs,function(comb){
          return _.zipObject(keys,comb);
      });
  }

  /**
   * Generate the cartesian product of input objects, arrays, or strings
   *
   *
   * product('me','hi')
   * // => [["m","h"],["m","i"],["e","h"],["e","i"]]
   *
   * product([1,2,3],['a','b','c']
   * // => [[1,"a"],[1,"b"],[1,"c"],[2,"a"],[2,"b"],[2,"c"],[3,"a"],[3,"b"],[3,"c"]]
   *
   * product({who:['me','you'],say:['hi','by']})
   * // => [{"who":"me","say":"hi"},{"who":"me","say":"by"},{"who":"you","say":"hi"},{"who":"you","say":"by"}]
   *
   * // It also takes in a single array of args
   * product(['me','hi'])
   * // => [["m","h"],["m","i"],["e","h"],["e","i"]]
   */
  function product(opts){
      if (arguments.length===1 && !_.isArray(opts))
          return _cartesianProductObj(opts)
      else if (arguments.length===1)
          return _cartesianProductOf(opts)
      else
          return _cartesianProductOf(arguments)
  }

  /**
   * Generate permutations, in all possible orderings, with no repeat values
   *
   *
   * permutations([1,2,3],2)
   * // => [[1,2],[1,3],[2,1],[2,3],[3,1],[3,2]
   *
   * permutations('cat',2)
   * // => [["c","a"],["c","t"],["a","c"],["a","t"],["t","c"],["t","a"]]
   */
    function permutations(obj, n){
        if (typeof obj=='string') obj = _.toArray(obj)
        n = n?n:obj.length
        // make n copies of keys/indices
        let nInds=[];
        for (var j = 0; j < n; j++) {nInds.push(_.keys(obj)) }
        // get product of the indices, then filter to remove the same key twice
        // var arrangements = product(nInds).filter(pair=>pair[0]!==pair[1]) // this line only removes duplicates from the first two elements.
        let arrangements = product(nInds);
        let out=[]
        for (let j=0; j< arrangements.length;j++ ) {
            let outt = arrangements[j].filter((value, index, self)=> {return self.indexOf(value) === index})
            if (outt.length === arrangements[j].length) out.push(outt)
        }
        return _.map(out,indices=>_.map(indices,i=>obj[i]))
    }


  /**
   * Generate n combinations of an object with no repeat values in each combination.
   *
   *
   * combinations([0,1,2,3],2)
   * // => [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]
   */
  function combinations(obj,n){
      /* filter out keys out of order, e.g. [0,1] is ok but [1,0] isn't */
      function isSorted(arr) {
          return _.every(arr, function (value, index, array) {
              return index === 0 || String(array[index - 1]) <= String(value);
          });
      }
      // array with n copies of the keys of obj
      return _(permutations(_.keys(obj),n))
          .filter(isSorted)
          .map(indices=>_.map(indices,i=>obj[i]))
          .value()
  }

  /**
   * Generate n combinations with repeat values.
   *
   *
   * combinations_with_replacement([0,1,2,3],2)
   * // => [[0,0],[0,1],[0,2],[0,3],[1,1],[1,2],[1,3],[2,2],[2,3],[3,3]]
   */
  function combinations_with_replacement(obj,n){
      if (typeof obj=='string') obj = _.toArray(obj)
      n = n?n:obj.length
      // make n copies of keys/indices
      for (var j = 0, nInds=[]; j < n; j++) {nInds.push(_.keys(obj)) }
      // get product of the indices, then filter to keep elements in order
      var arrangements = product(nInds).filter(pair=>pair[0]<=pair[1])
      return _.map(arrangements,indices=>_.map(indices,i=>obj[i]))
  }

    _.mixin({
        combinations,
        combinations_with_replacement,
        product,
        permutations
  })
    
};
