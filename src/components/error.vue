<template>

    <div class="error-page-box">
        <div class="error-gone-box" v-if="isTimeout">
            <img src="../assets/img/network_gone.png" alt=""/>
            <p class="error-desc">
                {{desc}} <span class="error-try-again" @click="(event) => { handleTryAgain(event) }"> 重新尝试</span>
            </p>
        </div>
        <div class="error-break-box" v-else>
            <img src="../assets/img/network_break.png" alt=""/>
            <p class="error-desc">{{desc}} <span class="error-try-again" @click="(event) => { handleTryAgain(event) }"> 重新尝试</span></p>
        </div>
    </div>

</template>

<script>
    export default {
        name: "error",
        data () {
            return {
                isTimeout: true,
                desc: '',
                redirectPath: '/',
            };
        },

        methods: {
            handleTryAgain() {
                console.log('点击重新尝试');
                this.$router.push({path: this.redirectPath});
            },
        },

        mounted () {
            console.log('this.$route.params %o', this.$route.params);
            this.isTimeout = this.$route.params['isTimeout'];
            this.desc = this.$route.params['desc'];
            this.redirectPath = this.$route.params['path'];
        },
    }
</script>

<style lang="less" scoped>
    p {
        margin: 0;
        padding: 0;
    }

    .error-page-box {
        width: 920px;
        height: 920px;
        display: table;
        margin: auto;
        font-size: 15px;

        .error-break-box,
        .error-gone-box {
            margin: auto;
            display: table-cell;
            text-align: center;
            padding-top: 30vh;

            & img {
                width: 128px;
                height: 102px;
            }

            & p.error-desc {
                margin: 0;
                padding: 16px 0 0;
                color: #969696;
                font-weight: 400;
                line-height: 14px;
            }

            span.error-try-again {
                color: #5369E3;
                user-select: none;
            }

            span.error-try-again:hover {
                cursor: pointer;
            }

        }

        .error-break-box {

        }

        .error-gone-box {

        }
    }

</style>