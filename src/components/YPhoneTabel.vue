<template>
    <div v-for="(item,index) in data" :key="index">
        <div class="card-background">
            <div class="transaction-card">
            <div class="card-header">
                <span class="transaction-id">{{ item.transactionData}}</span>
                <span class="transaction-type expense">{{ item.transactionType}}</span>
            </div>
            <div class="card-body">
                <div class="event-row">
                    <span class="event-name">{{ item.event}}</span>
                    <span class="amount expense-amount">-{{ item.money}}</span>
                </div>
                <div class="details-grid">
                    <div class="detail-item">
                        <div class="description-label">備註</div>
                        <div class="description-text">{{ item.descriptoin}}</div>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">支付方式</span>
                        <span class="detail-value">
                            {{ item.bankAccount}}
                            {{ item.currency}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </div> 
    </div>
</template>
<script>
export default {
    name: "YPhoneTabel",
    props:{
        data: {
            type: Array,
            default: () => []
        }
    }
}
</script>
<style scoped>
.card-background{
    display: flex;
    justify-content: center;
    align-items: center;
}
.transaction-card {
    margin: 20px;
    width: 90%;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.transaction-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.card-header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.transaction-id {
    font-size: 14px;
    color: #8a8a8a;
    font-weight: 500;
}

.transaction-type {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
}

.expense {
    background-color: #ffeaea;
    color: #e74c3c;
}

.income {
    background-color: #e8f7ef;
    color: #27ae60;
}

.card-body {
    padding: 20px 24px;
}

.event-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.event-name {
    font-size: 20px;
    font-weight: 700;
    color: #2c3e50;
}

.amount {
    font-size: 24px;
    font-weight: 700;
}

.expense-amount {
    color: #e74c3c;
}

.income-amount {
    color: #27ae60;
}

.details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 20px;
}

.detail-item {
    display: flex;
    flex-direction: column;
}

.detail-label {
    font-size: 13px;
    color: #8a8a8a;
    margin-bottom: 4px;
}

.detail-value {
    font-size: 15px;
    font-weight: 600;
    color: #2c3e50;
}

.description-section {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
}

.description-label {
    font-size: 13px;
    color: #8a8a8a;
    margin-bottom: 6px;
}

.description-text {
    font-size: 15px;
    color: #2c3e50;
    line-height: 1.5;
}

.card-footer {
    padding: 16px 24px 20px;
    background-color: #f9fafb;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bank-account {
    display: flex;
    align-items: center;
    gap: 8px;
}

.bank-icon {
    width: 32px;
    height: 32px;
    background-color: #07c160;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
}

.bank-name {
    font-weight: 600;
    color: #2c3e50;
}

.currency {
    font-size: 14px;
    color: #8a8a8a;
    font-weight: 500;
}

@media (max-width: 480px) {
    .transaction-card {
        max-width: 100%;
    }
    
    .details-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }
    
    .card-header, .card-body, .card-footer {
        padding: 16px 20px;
    }
}

</style>