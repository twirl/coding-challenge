SELECT 
    b.blocked,
    a.data 
FROM reports a 
INNER JOIN sources b 
ON a.status != 'CLOSED' AND b.id = a.source_id;