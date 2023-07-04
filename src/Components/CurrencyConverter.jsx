import React, { useState, useEffect } from 'react';

import {
    Container,
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Typography,
    CardActions
} from '@mui/material';

import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

import moment from 'moment';

import { fetchSupportedCurrencies, convertCurrency } from '../Services/currencyAPI';

const CurrencyConverter = () => {

    const [currency, setCurrency] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState(null);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const supportedCurrencies = await fetchSupportedCurrencies();
            setCurrency(supportedCurrencies);
        }
        fetchCurrencies();
    }, []);

    const handleSelectCurrency = (e, setterFunction) => {
        setterFunction(e.target.value);
    };

    const handleConvert = async () => {
        try {
            const convertedAmount = await convertCurrency(from, to, amount);
            setConvertedAmount(convertedAmount);
        } catch (error) {
            console.error(error);
        }
    };

    const handleReset = () => {
        setFrom("");
        setTo("");
        setAmount("");
        setConvertedAmount(null);
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: { sm: "2rem", xs: "1rem" }, flexDirection: { sm: "row", xs: "column" } }}>
                <FormControl sx={{ width: { sm: "40%", xs: "100%" } }}>
                    <InputLabel>From</InputLabel>
                    <Select
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "#7F7FD5",
                                },
                            }
                        }}
                        label="From"
                        value={from}
                        onChange={(e) => handleSelectCurrency(e, setFrom)}
                    >
                        {currency.map((item, index) => (
                            <MenuItem key={index} value={item.symbol}>{item.symbol} - {item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FlipCameraAndroidIcon />

                <FormControl sx={{ width: { sm: "40%", xs: "100%" } }}>
                    <InputLabel>To</InputLabel>
                    <Select
                        label="To"
                        value={to}
                        onChange={(e) => handleSelectCurrency(e, setTo)}
                    >
                        {currency.map((item, index) => (
                            <MenuItem key={index} value={item.symbol}>{item.symbol} - {item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", mt: 5 }}>
                <TextField
                    type="number"
                    size='small'
                    value={amount}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "#7F7FD5",
                            },
                        },
                        "& .MuiFormLabel-root.Mui-focused": {
                            color: "#7F7FD5",
                        },
                    }}
                    placeholder='Amount'
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Button variant='contained'
                    sx={{
                        backgroundColor: "#7F7FD5",
                        '&:hover': {
                            backgroundColor: "#7F7FD5",
                        }
                    }}
                    disabled={from === "" || to === "" || amount === ""}
                    onClick={handleConvert}
                >
                    Convert
                </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "end", mt: 5 }}>
                <Card sx={{ width: "100%", maxWidth: 345 }}>
                    <CardContent>
                        <Typography>{moment().format('DD MMMM YYYY, h:mm:ss a')}</Typography>
                        {
                            convertedAmount && (
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant='subtitle1' color="text.secondary">
                                        {amount} {from} equals
                                    </Typography>
                                    <Typography variant='h5' color="text.secondary">
                                        {convertedAmount} {to}
                                    </Typography>
                                </Box>
                            )
                        }
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' onClick={handleReset} size="small">Reset</Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    )
}

export default CurrencyConverter;
