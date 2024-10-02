

const AddressForm = ({ onAddressAdded }) => {
    const [addressData, setAddressData] = useState({ street: '', city: '', state: '', zipCode: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addAddress(addressData); // Функция для добавления адреса
        onAddressAdded(); // Уведомить родительский компонент
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Поля для ввода адреса */}
            <Form.Group>
                <Form.Label>Улица</Form.Label>
                <Form.Control type="text" onChange={e => setAddressData({ ...addressData, street: e.target.value })} />
            </Form.Group>
            {/* Остальные поля для ввода (город, штат, почтовый индекс) */}
            <Button type="submit">Добавить адрес</Button>
        </Form>
    );
};
