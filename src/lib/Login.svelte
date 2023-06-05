<script>
    import {Input, InputGroup, Button, Icon} from 'sveltestrap';
    import {set_api_key} from './client_utils';

    let value = '';
    function set_key() {
        set_api_key(value);
        window.location.replace('/');
    }
</script>

<InputGroup>
    <Input bind:value placeholder="Api key..."/>
    <Button on:click={set_key}>SUBMIT</Button>
</InputGroup>