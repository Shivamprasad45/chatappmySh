import NodeCache from "node-cache";

const cache = new NodeCache({
  stdTTL: 60 * 5, // 5 minutes TTL (you can adjust this)
  checkperiod: 120, // how often expired items are checked
});

export default cache;
