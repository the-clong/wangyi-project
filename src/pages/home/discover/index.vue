<template>
  <div id="discover">
    <Header />
    <scroll class="discover-scroll" :data="listInitArray">
      <ul class="discover-list">
        <li>
          <section class="swiper-container banner-container">
            <div class="swiper-wrapper" v-if="bannerList.length > 0">
              <div class="swiper-slide" v-for="(banner,index) in bannerList" :key="index">
                <div class="image-contain">
                  <img :src="banner.pic" />
                  <div :style="{'background': banner.titleColor === 'red' ? '#FC5243':'#43A5F0'}" class="tag">{{banner.typeTitle}}</div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </section>
        </li>
        <li>
          <section class="home-recommend">
            <ul>
              <li v-for="(item,index) in iconList" :key="index" @click="goIconPath(item.path)">
                <div class="icon-contain">
                  <svg class="svg-icon" aria-hidden="true">
                    <use :xlink:href="'#icon-'+item.icon"></use>
                  </svg>
                </div>
                <div class="title-contain">
                  {{item.title}}
                </div>
              </li>
            </ul>
          </section>
        </li>
        <!-- 推荐歌单-->
        <li>
          <discover-item :levelTitle="rsTitle" :subTitle="rsSubTitle" :btnText="rsBtnText" :songsList="rsSongsList" :itemType="rsItemType" :showPlayNum="rsShowPlayNum"></discover-item>
        </li>
        <!-- 风格推荐-->
        <li>
          <discover-item :levelTitle="srTitle" :subTitle="srSubTitle" :btnText="srBtnText" :songsList="srSongsList" :itemType="srItemType" :showPlayIcon="srShowPlayIcon" refStr="sr"></discover-item>
        </li>
        <!-- 场景推荐-->
        <li>
          <discover-item :levelTitle="cjTitle" :subTitle="cjSubTitle" :btnText="cjBtnText" :songsList="cjSongsList" :itemType="cjItemType"></discover-item>
        </li>
        <li>
          <discover-song :songsList="newSongsList" @toggleData="toggleSongs"></discover-song>
        </li>
        <!-- 排行榜 -->
        <li>
          <discover-item :levelTitle="rkTitle" :subTitle="rkSubTitle" :btnText="rkBtnText" :rankList="rankList" :itemType="rkItemType"></discover-item>
        </li>
        <!-- 电台 -->
        <li>
          <discover-item :levelTitle="djTitle" :subTitle="djSubTitle" :btnText="djBtnText" :jdProgramList="jdProgramList" :itemType="djItemType"></discover-item>
        </li>
      </ul>
    </scroll>
    <transition name="recommend">
      <router-view />
    </transition>
  </div>
</template>
<script>
import Swiper from 'Swiper';
import scroll from '@/base/scroll';
import _ from 'lodash';
import Song from '@/common/js/song';
import Bill from '@/common/js/billboard';
import Album from '@/common/js/album';
import Rank from '@/common/js/rank';
import { randomBySum } from '@/common/js/util';
import Header from '@/components/common/header';
import * as discover from '@/api/discover';
import discoverItem from '@/components/discover-item';
import discoverSong from '@/components/discover-song';
export default {
  components: {
    Header, scroll, discoverItem, discoverSong
  },
  data () {
    return {
      bannerList: [],
      iconList: [
        {
          icon: 'rili',
          path: '',
          title: '每日推荐'
        },
        {
          icon: 'gedan',
          path: '',
          title: '歌单'
        },
        {
          icon: 'paihangbang',
          path: '/home/discover/rank',
          title: '排行榜'
        },
        {
          icon: 'yule_yinlediantai',
          path: '',
          title: '电台'
        },
        {
          icon: 'zhibo',
          path: '',
          title: '直播'
        }
      ],
      rsSongsList: [],
      srSongsList: [],
      cjSongsList: [],
      newSongsList: [],
      rankList: [],
      jdProgramList: [],
      currentNews: 'song'
    };
  },
  computed: {
    listInitArray () {
      return [this.rsSongsList.length > 0 && this.srSongsList.length > 0 &&
        this.cjSongsList.length > 0 && this.newSongsList.length > 0 &&
        this.rankList.length > 0];
    }
  },
  created () {
    this.mySwiper = null;
    this.rsTitle = '推荐歌单';
    this.rsSubTitle = '为你精挑细选';
    this.rsBtnText = '查看更多';
    this.rsItemType = 'scroll';
    this.rsShowPlayNum = true;

    this.srTitle = '风格推荐';
    this.srSubTitle = '';
    this.srBtnText = '播放全部';
    this.srItemType = 'slide';
    this.srShowPlayIcon = true;

    this.cjTitle = '场景推荐';
    this.cjSubTitle = '音乐伴你 日落而归';
    this.cjBtnText = '查看更多';
    this.cjItemType = 'scroll';

    this.rkTitle = '排行榜';
    this.rkSubTitle = '热歌风向标';
    this.rkBtnText = '查看更多';
    this.rkItemType = 'rank';

    this.djTitle = '电台推荐';
    this.djSubTitle = '我用此声伴你心';
    this.djBtnText = '查看更多';
    this.djItemType = 'program';

    this.initBannerData();
    this.initRecommendSongs();
    this.initStyleRecommend();
    this.initSceneRecommend();
    this.initNewSongsList();
    this.initRankList();
    this.initDJProgramList();
  },
  watch: {
    'bannerList.length': function (len) {
      if (len > 0) {
        setTimeout(() => this.initBannerSwiper(), 500);
      }
    },
    currentNews: function (current) {
      if (current === 'song') {
        this.initNewSongsList();
      } else {
        this.initNewsAlbumList();
      }
    }
  },
  mounted () {

  },
  methods: {
    async initBannerData () {
      const res = await discover.getBannerList();
      this.bannerList = res.banners;
    },
    async initRecommendSongs () {
      const self = this;
      const res = await discover.searchRecommandSongsAction({ limit: 6 });
      this.rsSongsList = _.map(res.result, item => {
        return new Song({
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          playCount: self.countCheck(item.playCount)
        });
      });
    },
    async initStyleRecommend () {
      // 筛选出风格的所有类别1
      const categoryRes = await discover.getCategoryList();
      const categoryList = _.filter(categoryRes.sub, item => item.category === 1);
      const name = categoryList[_.random(22)].name;
      // 根据风格筛选对应歌单
      const songSheetRes = await discover.searchSongSheetsList({ limit: 1, cat: name });
      const playlists = songSheetRes.playlists;
      this.srSubTitle = playlists[0].tags.slice(0, 3).join(',').substr(0, 10);
      // 根据歌单id查询歌单详情并选出开始的12首歌曲
      const styleRecoRes = await discover.getCategoryDetail(playlists[0].id);
      this.srSongsList = _.map(styleRecoRes.playlist.tracks.slice(0, 12), item => new Song({
        id: item.id,
        name: item.name,
        picUrl: item.al.picUrl,
        albumName: item.al.name
      })
      );
    },
    async initSceneRecommend () {
      const res = await discover.searchSongSheetsList({ cat: '官方' });
      this.cjSongsList = _.map(res.playlists.slice(0, 6), item => new Bill({
        id: item.id,
        nameCJ: item.name,
        picUrl: item.coverImgUrl
      }));
    },
    async initNewSongsList () {
      const newSongres = await discover.searchRecoResourceAction();
      this.newSongsList = _.map(newSongres.recommend.slice(0, 6), item =>
        new Song({
          id: item.id,
          name: item.name,
          picUrl: item.picUrl,
          artist: item.creator.copywriter,
          albumName: item.creator.nickname
        }));
    },
    async initNewsAlbumList () {
      const newAlbumRes = await discover.getNewestAlbum();
      this.newSongsList = _.map(newAlbumRes.albums.slice(0, 12), item =>
        new Album({
          id: item.id,
          name: item.name,
          picUrl: item.blurPicUrl,
          artist: item.artist.name,
          albumName: item.artist.name
        }));
    },
    initRankList () {
      const rankNumArr = randomBySum(5, 34);
      const promiseArr = [];
      _.map(rankNumArr, item => {
        promiseArr.push(discover.searchRankTop(item));
      });
      Promise.all(promiseArr).then(res => {
        this.rankList = _.map(res, item => new Rank({
          id: item.playlist.id,
          name: item.playlist.name,
          tracks: item.playlist.tracks.slice(0, 3)
        }));
      });
    },
    async initDJProgramList () {
      const res = await discover.searchDJProgram();
      this.jdProgramList = res.result;
    },
    initBannerSwiper () {
      this.mySwiper = new Swiper('.banner-container', {
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'banner-bullet-active'
        }
      });
    },
    toggleSongs (currentSlide) {
      this.currentNews = currentSlide;
    },
    countCheck (count) {
      return Math.round(count / 10000);
    },
    goIconPath (path) {
      if (!path) {

      } else {
        this.$router.push({
          path
        });
      }
    }
  }
};
</script>
<style lang="scss">
#discover {
  height: 100%;
  .discover-scroll {
    position: relative;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
    .discover-list > li {
      .banner-container {
        width: 100%;
        position: relative;
        .swiper-wrapper {
          .swiper-slide {
            width: 100%;
            & > .image-contain {
              overflow: hidden;
              border-radius: 4px;
              position: relative;
              margin: 0 10px;
              border-radius: 8px;
              overflow: hidden;
              > img {
                width: 100%;
                vertical-align: middle;
              }
              > .tag {
                position: absolute;
                right: 0;
                bottom: 0;
                padding: 0 8px;
                line-height: 27px;
                color: #fff;
                border-top-left-radius: 8px;
              }
            }
          }
        }
        .swiper-pagination-bullets {
          .swiper-pagination-bullet {
            background-color: #fff;
            opacity: 0.5;
          }
          .banner-bullet-active {
            opacity: 1;
            background-color: #ff3a3b;
          }
        }
      }
      .home-recommend {
        ul {
          display: flex;
          padding: 13px 10px;
          li {
            flex: 1;
            & > .icon-contain {
              margin: 0 auto;
              width: 47px;
              height: 47px;
              line-height: 47px;
              border-radius: 50%;
              background-image: linear-gradient(to right, #fe5649, #ff1c13);
              text-align: center;
              font-size: 28px;
              color: #fff;
            }
            & > .title-contain {
              padding-top: 10px;
              text-align: center;
              font-size: 16px;
              color: #686868;
            }
          }
        }
      }
    }
  }
}
</style>
