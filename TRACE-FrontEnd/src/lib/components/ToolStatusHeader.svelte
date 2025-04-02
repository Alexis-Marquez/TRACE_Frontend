<script>
    let props = $props()
    let active = props.active
    let title = props.title
</script>

<div class="form-header">
    <h3>{title}</h3>
    <div class="stepper">
        <div class="step {active==='Configuration' ? 'active' : ''}">
            <div class="circle"></div>
            <span>Configuration</span>
        </div>
        <div class="line"></div>
        <div class="step {active==='Running' ? 'active' : ''}">
            <div class="circle"></div>
            <span>Running</span>
        </div>
        <div class="line"></div>
        <div class="step {active==='Results' ? 'active' : ''}">
            <div class="circle"></div>
            <span>Results</span>
        </div>
    </div>
</div>

<style>
    .form-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 700px;
        margin-bottom: 1rem;
    }

    .stepper {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.75rem;
        color: #999;
    }

    .step.active {
        color: #4aa6b0;
        font-weight: bold;
    }

    .circle {
        width: 12px;
        height: 12px;
        border: 2px solid #ccc;
        border-radius: 50%;
        background: white;
    }

    .step.active .circle {
        border-color: #4aa6b0;
        background: #4aa6b0;
    }

    .line {
        width: 30px;
        height: 2px;
        background: #ccc;
        margin: 0 4px;
        align-self: center;
    }

</style>