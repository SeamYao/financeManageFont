<template>
<div class="main">
    <TranscationFrom>

    </TranscationFrom>
    <div class="card">
        <YPhoneTabel
            :data="phoneData">

        </YPhoneTabel>
    </div>
    

</div>

    
</template>
<script>
import TranscationFrom from '@/components/TransactionForm.vue'
import YPhoneTabel from '@/components/YPhoneTabel'

export default {
    components: {
        TranscationFrom,
        YPhoneTabel
    },
    data(){
        return {
            phoneData: [
                { transactionData: "2025/11/04", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/04", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信2", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/05", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣2", descriptoin: "大家樂"},
                { transactionData: "2025/11/06", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/06", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/07", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
                { transactionData: "2025/11/08", event: "1324", money: 1234.23, transactionType: "支出", bankAccount: "微信", expensesType: "日常開支", currency: "人民幣", descriptoin: "大家樂"},
            ] 
        }    
    }
}
</script>
<style scoped>
.main{
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
    align-items: start;
}
.card{
 

    width: 100%;
    background: rgb(0, 0, 0);
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>