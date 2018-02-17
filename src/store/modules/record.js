/**
 * @file record 对应的 module
 * @author ltaoo<litaowork@aliyun.com>
 */
import {
  FETCH_RECORDS,
} from '@/common/constants';
import {
  fetchRecords,
} from '@/api/admin/records';

import {
  returnTime,
  rank,
} from '@/utils/index';

// state
const state = {
  data: [],
};
// getters
const getters = {
  records: state => {
    return state.data;
  },
};
// actions
const actions = {
  /**
   * 搜索借阅记录
   */
  [FETCH_RECORDS] ({
    commit,
  }, params) {
    fetchRecords(params)
      .then((res) => {
        const records = res.data.map(record => {
          // const tagtable = {
          // 	0: '超期',
          // 	1: '已还',
          // 	2: '未还'
          // }
          const flag = returnTime(
            record.returnTime,
            record.borrowTime,
            record.memberRank,
          );
          return {
            ...record,
            memberRank: rank(record.memberRank),
            // returnTime: returnTime(record.borrowTime, record.memberRank),
            // 是否归还、超期的标志
            tag: flag,
          };
        });
        commit('setData', records);
      });
  },
};
// mutations
const mutations = {
  setData (state, books) {
    state.data = books;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
