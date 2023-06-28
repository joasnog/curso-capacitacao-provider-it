import { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DateToString } from '../../utils/DateUtils';
import CustomerDialog from '../../components/CustomerDialog';

import '../../index.css';
import api from '../../services/api';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [customers, setCustomers] = useState(null);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [selectedCustomer, setSelectedCustomer] = useState({});

    const toast = useRef(null);

    async function getCustomers() {
        let list = [];

        let customers = await api.get("/customers");

        if (customers.data) {
            customers.data.forEach((customer) => {
                const customerData = {
                    'id': customer.id,
                    'name': customer.name,
                    'phone': customer.phone,
                    'birthday': new Date(customer.birthday),
                    'cpf': customer.cpf,
                    'gender': customer.gender,
                    'address': customer.address,
                    'number': customer.number,
                    'complement': customer.complement,
                    'cep': customer.cep,
                    'createdBy': customer.createdBy,
                };

                list.push(customerData);
            })
        }

        setCustomers(list);
    }

    useEffect(() => {
        getCustomers();
        initFilters();
    }, []);

    async function handleDeleteCustomer(id) {
        try {
            await api.delete(`/customers/${id}`);
            getCustomers();
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Excluído com sucesso.', life: 3000 });
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro.', life: 3000 });
        }
    };

    async function handleLogout() {
        await logout();
    }

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Confirma a exclusão do registro?',
            header: 'Confirmação',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => handleDeleteCustomer(id),
        });
    };

    const actions = (customer) => {
        return (
            <div>
                <Button onClick={() => {
                    setIsEditing(true);
                    setCustomerData(customer);
                    setDialogVisible(true);
                }}
                    label='Editar' size='small' className='p-button-outlined btn-secondary mr-2' />
                <Button onClick={() => {
                    confirmDelete(customer.id);
                }}
                    label='Excluir' size='small' className="p-button-danger p-button-outlined" />
            </div>
        );
    }

    const formatDate = (value) => {
        return value.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: 'UTC',
        });
    };

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            phone: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            birthday: {
                operator: FilterOperator.AND,
                label: '',
                constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
            },
            createdBy: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
        });
        setGlobalFilterValue("");
    };

    const renderFilterHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Limpar"
                    className="p-button-outlined btn-secondary"
                    onClick={clearFilter}
                />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Pesquisa"
                    />
                </span>
            </div>
        );
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.birthday);
    };

    const dateFilterTemplate = (options) => {
        return (
            <Calendar
                value={options.value}
                onChange={(e) => options.filterCallback(e.value, options.index)}
                dateFormat="dd/mm/yy"
                placeholder="dd/mm/yyyy"
                mask="99/99/9999"
            />
        );
    };

    const onRowSelect = (event) => {
        setSelectedCustomer(event.data);
    };

    const header = renderFilterHeader();

    return (
        <div className="card flex justify-content-center align-items-center h-screen" style={{ backgroundColor: '#F8F2F0' }}>
            <Sidebar visible={sideBarVisible} onHide={() => setSideBarVisible(false)}>
                <h2 className='mb-5'>{`Olá ${user.name}`}</h2>
                <Button label='Sair' size='small' className='btn-primary' onClick={handleLogout} />
            </Sidebar>

            <Button className='absolute top-0 left-0 btn-primary' icon="pi pi-align-left" onClick={() => setSideBarVisible(true)} />

            <Toast ref={toast} />
            <ConfirmDialog />

            <div>
                <div className='w-full flex justify-content-end my-5'>
                    <Button label='Novo Cliente' size='small' className='btn-primary' onClick={() => {
                        setCustomerData({});
                        setIsEditing(false);
                        setDialogVisible(true);
                    }} />
                </div>

                <div className="datatable-filter-demo">
                    <div className='flex flex-wrap justify-content-evenly my-5'>
                        <InputText disabled='true' placeholder='Nome do Cliente' value={selectedCustomer != null ? selectedCustomer.name : ''} />
                        <InputText disabled='true' placeholder='Data de Nascimento' value={selectedCustomer != null ? DateToString(selectedCustomer.birthday) : ''} />
                    </div>
                    <div className="card">
                        <DataTable
                            value={customers}
                            className="p-datatable-customers"
                            paginator rows={3}
                            rowsPerPageOptions={[3, 5, 10, 25, 50]}
                            filters={filters}
                            filterDisplay="menu"
                            globalFilterFields={["name", "birthday", "phone", "createdBy"]}
                            header={header}
                            selectionMode="single"
                            selection={selectedCustomer}
                            onSelectionChange={(e) => setSelectedCustomer(e.value)}
                            onRowSelect={onRowSelect}
                            metaKeySelection={false}
                            emptyMessage="Nenhum cliente encontrado."
                            stripedRows
                            removableSort
                        >
                            <Column
                                header="Nome"
                                field="name"
                                sortable
                                filter
                                filterPlaceholder="Pesquisar"
                                style={{ minWidth: "10rem" }}
                            />
                            <Column
                                header="Telefone"
                                field="phone"
                                sortable
                                filter
                                filterPlaceholder="Pesquisar"
                                style={{ minWidth: "10rem" }}
                            />
                            <Column
                                header="Data de Nascimento"
                                filterField="birthday"
                                dataType="date"
                                style={{ minWidth: "10rem" }}
                                body={dateBodyTemplate}
                                filter
                                sortable
                                field='birthday'
                                filterElement={dateFilterTemplate}
                            />
                            <Column
                                header="Criado Por"
                                sortable
                                filter
                                filterPlaceholder="Pesquisar"
                                field='createdBy'
                            />
                            <Column
                                header="Ações"
                                body={actions}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>

            <CustomerDialog
                visible={dialogVisible}
                setDialogVisible={setDialogVisible}
                toast={toast}
                isEditing={isEditing}
                customerData={customerData}
                getCustomers={getCustomers}
                onHide={() => {
                    setIsEditing(false);
                    setCustomerData({});
                    setDialogVisible(false);
                }} />
        </div>
    );
}