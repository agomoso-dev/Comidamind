import React, { useState , useContext } from 'react';
import { Button, Card, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Radio, RadioGroup, Stack, TextField, Typography  } from '@mui/material';
import { StateContext } from '../../App';
import AddFamilyMemberHandler from '../../components/family/AddFamilyMenberHandler';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


function FormAddFamilyMember() {

    const [formData,  setFormData] = useState("");
    const [resComp, setRestComp] = useState(null);
    
    const  {
            nav, 
            userName, setUserName, 
            famId, setfamId,
            userLastName, setUserLastName,
            userEmail, setUserEmail,
            recipeId, setRecipeId,
            menuId, setMenuId,
           } = useContext(StateContext);

    const [name, setname] = useState("");
    const [weight, setweight ] = useState(0);
    const [height, setheight ] = useState(0);
    const [bdate, setbdate ] = useState(dayjs(formData.dateAvailable));
    const [gender, setGender ] = useState("male");
    
    const [breackfast, setbreackfast ] = useState(true);
    const [snack1, setsnack1 ] = useState(false);
    const [lunch, setlunch ] = useState(true);
    const [snack2, setsnack2 ] = useState(false);
    const [dinner, setdinner ] = useState(true);

    const [sedentarismo,  setsedentarismo ] = useState("medium");
    const [objective,  setobjective] = useState("keep");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("RegisterHandler start")
        const data = { 
                family_unit_id: famId,
                name : name,
                gender: gender,
                weight : weight,
                height : height,
                birth_date : bdate.year() + '-' + bdate.month() + '-' + bdate.date(),
                breackfast: breackfast,
                snack1 :snack1, 
                lunch :lunch, 
                snack2 :snack2, 
                dinner :dinner,
                activity_level : sedentarismo,
                objective : objective,
            }
        setRestComp();
        setRestComp(<AddFamilyMemberHandler data={data}/>);
        console.log("RegisterHandler end")
    };

    const handleDataChange = ( date, name ) => {
        if (date) {
            setFormData({ ...formData, [name]: date }); 
            setbdate(dayjs(formData.dateAvailable));
        }
    };

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Typography variant="h3" component="h3">
                Add Family Member
            </Typography>
            {resComp}
            <form onSubmit={(event)=>{handleSubmit(event)}} encType="multipart/form-data" noValidate="">
                <TextField label="Nombre" fullWidth required margin="dense" 
                    value={name}
                    onChange={(event) => setname(event.target.value)}
                />

                <TextField label="Weight" type="number" fullWidth required margin="dense" 
                    value={weight}
                    onChange={(event) => setweight(Number(event.target.value))}
                />

                <TextField label="Height" type="number" fullWidth required margin="dense"
                    value={height}
                    onChange={(event) => setheight(Number(event.target.value))}
                />
                
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Birth datr" fullWidth 
                        name="dateAvailable"
                        value={bdate} 
                        onChange={(date)=>
                            handleDataChange(date, "dateAvailable")
                        }/> 
                </DemoContainer>
                <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
                >
                    <Typography variant="h4" component="h4">
                            Gender
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                defaultValue="medium"
                                name="radio-buttons-group"
                                value={gender}
                                onChange={(event) => { setGender(event.target.value);}}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                </Stack>
                <Stack direction="row" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
                >
                    <Card
                        component="span"
                        sx={{
                            width: '100%',
                            height: '50%'
                        }}>
                        <Typography variant="h4" component="h4">
                            Meals
                        </Typography>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={breackfast} 
                            onChange={() => setbreackfast(!breackfast)}
                            name="breackfast" />} label="Breackfast" />
                            <FormControlLabel control={<Checkbox checked={snack1} 
                            onChange={() => setsnack1(!snack1)}
                            name="snack1" />} label="snack1" />
                            <FormControlLabel control={<Checkbox checked={lunch} 
                            onChange={() => setlunch(!lunch)}
                            name="lunch" />} label="lunch" />
                            <FormControlLabel control={<Checkbox checked={snack2} 
                            onChange={() => setsnack2(!snack2)}
                            name="snack2" />} label="snack2" />
                            <FormControlLabel control={<Checkbox checked={dinner} 
                            onChange={() => setdinner(!dinner)}
                            name="dinner" />} label="dinner" />
                        </FormGroup>
                    </Card>
                    <Card component="span"
                        sx={{ 
                            width: '100%',
                            height: '50%'
                        }}>
                        <Typography variant="h4" component="h4">
                            Sedentarism
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                defaultValue="medium"
                                name="radio-buttons-group"
                                value={sedentarismo}
                                onChange={(event) => { setsedentarismo(event.target.value);}}
                            >
                                <FormControlLabel value="low" control={<Radio />} label="Low" />
                                <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                <FormControlLabel value="high" control={<Radio />} label="high" />
                            </RadioGroup>
                        </FormControl>
                    </Card>
                    <Card component="span"
                        sx={{ 
                            width: '100%',
                            height: '50%'
                        }}>
                        <Typography variant="h4" component="h4">
                            Objective
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                defaultValue="medium"
                                name="radio-buttons-group"
                                value={objective}
                                onChange={(event) => { setobjective(event.target.value);}}
                            >
                                <FormControlLabel value="lose" control={<Radio />} label="Lose weight" />
                                <FormControlLabel value="keep" control={<Radio />} label="Keep weight" />
                                <FormControlLabel value="gain" control={<Radio />} label="Gain weight" />
                            </RadioGroup>
                        </FormControl>
                    </Card>
                </Stack>

                
                <Button variant="contained" 
                    type="submit">
                    Add Member
                </Button>
            </form>
        </Stack>  
  )
}

export default FormAddFamilyMember;