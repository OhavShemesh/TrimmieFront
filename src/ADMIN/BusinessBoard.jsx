import React from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Stack,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ContentCutIcon from "@mui/icons-material/ContentCut";


export default function BusinessBoard({
    isUserConnected,
    isUserAdmin,
    connectedUser,
    onSave,
    weekDates,
    workingHoursByDate,
    workingHoursSelectedDate,
    appointmentsSelectedDate,
    showSlots,
    setAppointmentsSelectedDate,
    setWorkingHoursSelectedDate,
    setShowSlots,
    handleDragEnd,
    uniqueDates,
    filteredAppointments,
    unavailableSlots,
    availableSlots
}) {


    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {!isUserConnected && !isUserAdmin && <Typography variant="h4">Please Connect...</Typography>}
            {isUserConnected && !isUserAdmin && <Typography variant="h4">You are not an admin, this is an admin-only board!</Typography>}
            {isUserConnected && isUserAdmin && (
                <>
                    <Box sx={{ my: 5 }}>
                        <Typography variant="h4" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
                            <ContentCutIcon /> {connectedUser?.name}
                        </Typography>
                    </Box>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        {showSlots && (
                            <Paper sx={{ p: 2, mb: 4, width: "50%", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                                <Typography variant="h4">תורים עתידיים</Typography>
                                <Stack direction="row" gap={2} flexWrap="wrap" justifyContent="center" sx={{ mb: 2 }}>
                                    {uniqueDates.map((date) => (
                                        <Chip key={date} label={date} color={date === appointmentsSelectedDate ? "primary" : "default"} onClick={() => setAppointmentsSelectedDate(date)} sx={{ fontSize: "16px", height: "40px", px: 2 }} />
                                    ))}
                                </Stack>
                                <Table size="small" sx={{ width: "100%" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">שירות</TableCell>
                                            <TableCell align="center">שעה</TableCell>
                                            <TableCell align="center">שם לקוח</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredAppointments.map(({ _id, customerName, scheduledAt, service }) => (
                                            <TableRow key={_id} hover>
                                                <TableCell align="center">{service}</TableCell>
                                                <TableCell align="center">{scheduledAt.split(" ")[1]}</TableCell>
                                                <TableCell align="center">{customerName}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        )}

                        <Box sx={{ py: 2 }}>
                            <Button variant="contained" onClick={() => setShowSlots((prev) => !prev)} sx={{ fontSize: "20px", borderRadius: "20px" }}>
                                {!showSlots ? "הסתר שעות לשינוי" : "הצג שעות לשינוי"}
                            </Button>
                        </Box>

                        {!showSlots && (
                            <>
                                <FormControl sx={{ mb: 2, minWidth: 220 }}>
                                    <InputLabel>בחר תאריך לשינוי שעות</InputLabel>
                                    <Select value={workingHoursSelectedDate} label="בחר תאריך לשינוי שעות" onChange={(e) => setWorkingHoursSelectedDate(e.target.value)}>
                                        {weekDates.map((date) => (
                                            <MenuItem key={date} value={date}>{date}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Paper sx={{ p: 2, mb: 4, width: "95%" }}>
                                    <Typography variant="h6" sx={{ direction: "rtl", mb: 2 }}>שעות לא זמינות</Typography>
                                    <Droppable droppableId="free" direction="horizontal">
                                        {(provided) => (
                                            <Stack direction="row" gap={1} flexWrap="wrap" ref={provided.innerRef} {...provided.droppableProps} sx={{ minHeight: 56, p: 1 }}>
                                                {unavailableSlots.map((slot, index) => (
                                                    <Draggable key={slot} draggableId={slot} index={index}>
                                                        {(provided) => (
                                                            <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <Chip label={slot} sx={{ fontSize: 18, height: 48, padding: "0 16px", cursor: "grab", userSelect: "none" }} />
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Stack>
                                        )}
                                    </Droppable>
                                </Paper>

                                <Paper sx={{ p: 2, width: "95%" }}>
                                    <Typography variant="h6" sx={{ direction: "rtl", mb: 2 }}>שעות זמינות</Typography>
                                    <Droppable droppableId="selected" direction="horizontal">
                                        {(provided) => (
                                            <Stack direction="row" gap={1} flexWrap="wrap" ref={provided.innerRef} {...provided.droppableProps} sx={{ minHeight: 56, p: 1 }}>
                                                {availableSlots.map((slot, index) => (
                                                    <Draggable key={slot} draggableId={slot} index={index}>
                                                        {(provided) => (
                                                            <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                <Chip label={slot} sx={{ fontSize: 18, height: 48, padding: "0 16px", cursor: "grab", userSelect: "none", backgroundColor: "green", color: "white" }} />
                                                            </Box>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </Stack>
                                        )}
                                    </Droppable>
                                </Paper>

                                <Box sx={{ paddingY: 5 }}>
                                    <Button variant="contained" sx={{ fontSize: "24px", borderRadius: "20px" }} onClick={() => onSave?.(workingHoursSelectedDate, workingHoursByDate[workingHoursSelectedDate])}>
                                        שמור
                                    </Button>
                                </Box>
                            </>
                        )}
                    </DragDropContext>
                </>
            )}
        </Box>
    );
}
